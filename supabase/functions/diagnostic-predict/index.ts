import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

import scalerArtifact from "./artifacts/scaler.json" assert { type: "json" };
import lrArtifact from "./artifacts/logistic_regression.json" assert { type: "json" };
import svmArtifact from "./artifacts/svm_linear.json" assert { type: "json" };
import knnArtifact from "./artifacts/knn.json" assert { type: "json" };
import rfArtifact from "./artifacts/random_forest.json" assert { type: "json" };
import featureNamesArtifact from "./artifacts/feature_names.json" assert { type: "json" };
import metadataArtifact from "./artifacts/models_metadata.json" assert { type: "json" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Construct dynamic Zod schema for 30 UCI features
const featureSchemaShape: Record<string, z.ZodTypeAny> = {};
for (const featureName of featureNamesArtifact) {
  featureSchemaShape[featureName] = z
    .number({ invalid_type_error: `${featureName} must be a valid number` })
    .finite(`${featureName} must be a finite number`);
}
const inputValidationSchema = z.object(featureSchemaShape);

function sigmoid(zVal: number): number {
  return 1 / (1 + Math.exp(-zVal));
}

type TreeNode = {
  feature: number | null;
  threshold: number | null;
  left: TreeNode | null;
  right: TreeNode | null;
  value: number | null;
};

function traverseTree(node: TreeNode, scaledVector: number[]): number {
  if (node.value !== null && node.value !== undefined) {
    return node.value;
  }
  if (node.feature !== null && node.threshold !== null && node.left && node.right) {
    const val = scaledVector[node.feature];
    if (val <= node.threshold) {
      return traverseTree(node.left, scaledVector);
    } else {
      return traverseTree(node.right, scaledVector);
    }
  }
  return 0.5;
}

function formatLabel(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();

    // 1. Strict Input Validation via Zod
    const validationResult = inputValidationSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors.map((e) => e.message).join("; ");
      return new Response(JSON.stringify({ error: `Invalid feature inputs: ${errorMsg}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const inputFeatures: Record<string, number> = validationResult.data;

    // 2. Feature Scaling
    const featureCount = featureNamesArtifact.length;
    const scaledVector: number[] = new Array(featureCount);
    const rawVector: number[] = new Array(featureCount);

    for (let i = 0; i < featureCount; i++) {
      const fName = featureNamesArtifact[i];
      const rawVal = inputFeatures[fName];
      rawVector[i] = rawVal;
      scaledVector[i] = (rawVal - scalerArtifact.mean[i]) / scalerArtifact.scale[i];
    }

    // 3. Model 1: Logistic Regression
    let lrLogit = lrArtifact.intercept;
    const lrAttributions: { feature: string; label: string; raw_value: number; scaled_value: number; contribution: number; impact: string }[] = [];

    for (let i = 0; i < featureCount; i++) {
      const fName = featureNamesArtifact[i];
      const contrib = lrArtifact.coef[i] * scaledVector[i];
      lrLogit += contrib;

      lrAttributions.push({
        feature: fName,
        label: formatLabel(fName),
        raw_value: rawVector[i],
        scaled_value: parseFloat(scaledVector[i].toFixed(3)),
        contribution: parseFloat(contrib.toFixed(4)),
        impact: contrib > 0 ? "Increases Malignancy Risk" : "Reduces Risk",
      });
    }

    const lrProb = sigmoid(lrLogit);
    lrAttributions.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

    // 4. Model 2: Support Vector Machine (Linear Kernel)
    let svmDecision = svmArtifact.intercept;
    const svmAttributions: { feature: string; label: string; raw_value: number; scaled_value: number; contribution: number; impact: string }[] = [];

    for (let i = 0; i < featureCount; i++) {
      const fName = featureNamesArtifact[i];
      const contrib = svmArtifact.coef[i] * scaledVector[i];
      svmDecision += contrib;

      svmAttributions.push({
        feature: fName,
        label: formatLabel(fName),
        raw_value: rawVector[i],
        scaled_value: parseFloat(scaledVector[i].toFixed(3)),
        contribution: parseFloat(contrib.toFixed(4)),
        impact: contrib > 0 ? "Increases Margin Risk" : "Reduces Risk",
      });
    }

    const svmProb = sigmoid(svmDecision);
    svmAttributions.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

    // 5. Model 3: K-Nearest Neighbors (k=5)
    const k = knnArtifact.k || 5;
    const distances: { distance: number; label: number }[] = [];

    for (let idx = 0; idx < knnArtifact.scaled_points.length; idx++) {
      const point = knnArtifact.scaled_points[idx];
      let distSq = 0;
      for (let i = 0; i < featureCount; i++) {
        const diff = scaledVector[i] - point[i];
        distSq += diff * diff;
      }
      distances.push({ distance: Math.sqrt(distSq), label: knnArtifact.labels[idx] });
    }

    distances.sort((a, b) => a.distance - b.distance);
    const topK = distances.slice(0, k);
    const malignantNeighbors = topK.filter((n) => n.label === 1).length;
    const knnProb = malignantNeighbors / k;

    // KNN feature attributions: dataset deviation approximation
    const knnAttributions = featureNamesArtifact.map((fName, i) => ({
      feature: fName,
      label: formatLabel(fName),
      raw_value: rawVector[i],
      scaled_value: parseFloat(scaledVector[i].toFixed(3)),
      contribution: parseFloat(Math.abs(scaledVector[i]).toFixed(4)),
      impact: "Dataset Deviation Approximation",
    })).sort((a, b) => b.contribution - a.contribution);

    // 6. Model 4: Random Forest (50 Trees)
    const trees = rfArtifact as TreeNode[];
    let totalTreeMalignantProb = 0;

    for (const tree of trees) {
      totalTreeMalignantProb += traverseTree(tree, scaledVector);
    }

    const rfProb = trees.length > 0 ? totalTreeMalignantProb / trees.length : 0.5;

    // RF feature attributions: dataset deviation approximation
    const rfAttributions = featureNamesArtifact.map((fName, i) => ({
      feature: fName,
      label: formatLabel(fName),
      raw_value: rawVector[i],
      scaled_value: parseFloat(scaledVector[i].toFixed(3)),
      contribution: parseFloat(Math.abs(scaledVector[i]).toFixed(4)),
      impact: "Dataset Deviation Approximation",
    })).sort((a, b) => b.contribution - a.contribution);

    // Assemble response
    const models = [
      {
        id: "logistic_regression",
        model: metadataArtifact.logistic_regression.name,
        prediction: lrProb >= 0.5 ? "Malignant" : "Benign",
        probability: parseFloat(lrProb.toFixed(4)),
        accuracy: metadataArtifact.logistic_regression.accuracy,
        f1_score: metadataArtifact.logistic_regression.f1_score,
        attribution_type: "exact_model_coefficient",
        feature_contributions: lrAttributions.slice(0, 10),
      },
      {
        id: "svm_linear",
        model: metadataArtifact.svm_linear.name,
        prediction: svmProb >= 0.5 ? "Malignant" : "Benign",
        probability: parseFloat(svmProb.toFixed(4)),
        accuracy: metadataArtifact.svm_linear.accuracy,
        f1_score: metadataArtifact.svm_linear.f1_score,
        attribution_type: "exact_hyperplane_margin",
        feature_contributions: svmAttributions.slice(0, 10),
      },
      {
        id: "random_forest",
        model: metadataArtifact.random_forest.name,
        prediction: rfProb >= 0.5 ? "Malignant" : "Benign",
        probability: parseFloat(rfProb.toFixed(4)),
        accuracy: metadataArtifact.random_forest.accuracy,
        f1_score: metadataArtifact.random_forest.f1_score,
        attribution_type: "dataset_variance_approximation",
        feature_contributions: rfAttributions.slice(0, 10),
      },
      {
        id: "knn",
        model: metadataArtifact.knn.name,
        prediction: knnProb >= 0.5 ? "Malignant" : "Benign",
        probability: parseFloat(knnProb.toFixed(4)),
        accuracy: metadataArtifact.knn.accuracy,
        f1_score: metadataArtifact.knn.f1_score,
        attribution_type: "dataset_variance_approximation",
        feature_contributions: knnAttributions.slice(0, 10),
      },
    ];

    const avgProb = models.reduce((acc, m) => acc + m.probability, 0) / models.length;

    const responsePayload = {
      is_placeholder_heuristic: false,
      is_real_trained_inference: true,
      timestamp: new Date().toISOString(),
      overall_risk_assessment: avgProb >= 0.5 ? "Malignant" : "Benign",
      average_probability: parseFloat(avgProb.toFixed(4)),
      models,
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to process diagnostic analysis" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
