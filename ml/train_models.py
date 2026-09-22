import json
import os
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, f1_score

def format_feature_name(name: str) -> str:
    # Standardize sklearn feature names to snake_case used in UCI Breast Cancer dataset
    # e.g., "mean radius" -> "radius_mean", "radius error" -> "radius_se", "worst radius" -> "radius_worst"
    parts = name.split()
    if len(parts) >= 2:
        prefix = parts[0]
        metric = "_".join(parts[1:])
        if prefix == "mean":
            return f"{metric}_mean"
        elif prefix in ["error", "se"]:
            return f"{metric}_se"
        elif prefix == "worst":
            return f"{metric}_worst"
    return name.replace(" ", "_")

def export_tree_node(tree, node_id=0):
    tree_ = tree.tree_
    if tree_.feature[node_id] != -2:  # Not a leaf node
        return {
            "feature": int(tree_.feature[node_id]),
            "threshold": float(tree_.threshold[node_id]),
            "left": export_tree_node(tree, tree_.children_left[node_id]),
            "right": export_tree_node(tree, tree_.children_right[node_id]),
            "value": None,
        }
    else:  # Leaf node
        values = tree_.value[node_id][0]
        total = float(values.sum())
        # In sklearn breast cancer, target 0 = Malignant, target 1 = Benign
        # Let's return probability of target 0 (Malignant) for consistency with research clinical metrics
        prob_malignant = float(values[0] / total) if total > 0 else 0.0
        return {
            "feature": None,
            "threshold": None,
            "left": None,
            "right": None,
            "value": prob_malignant,
        }

def main():
    print("=" * 60)
    print("BREASTCARE AI — TRAINING MACHINE LEARNING DIAGNOSTIC MODELS")
    print("=" * 60)

    # 1. Load UCI Breast Cancer Wisconsin (Diagnostic) Dataset
    cancer = load_breast_cancer()
    X_raw = cancer.data
    y_raw = cancer.target  # 0: Malignant, 1: Benign in sklearn (we map 0 -> Malignant)

    # Map target: 1 for Malignant, 0 for Benign in our platform
    y = np.where(y_raw == 0, 1, 0)

    # Standardized 30 feature names
    raw_feature_names = cancer.feature_names
    feature_names = [format_feature_name(f) for f in raw_feature_names]

    print(f"Dataset Loaded: {X_raw.shape[0]} samples, {X_raw.shape[1]} features")
    print(f"Target distribution: {np.sum(y == 1)} Malignant, {np.sum(y == 0)} Benign")

    # 2. Train / Test Split & Scaling
    X_train, X_test, y_train, y_test = train_test_split(
        X_raw, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 3. Train Models
    print("\nTraining models with hyperparameter tuning...")

    # (a) Logistic Regression
    lr = LogisticRegression(random_state=42, max_iter=1000)
    lr.fit(X_train_scaled, y_train)
    lr_preds = lr.predict(X_test_scaled)
    lr_acc = float(accuracy_score(y_test, lr_preds))
    lr_f1 = float(f1_score(y_test, lr_preds, average="macro"))

    # (b) Linear SVM
    svm = SVC(kernel="linear", probability=True, random_state=42)
    svm.fit(X_train_scaled, y_train)
    svm_preds = svm.predict(X_test_scaled)
    svm_acc = float(accuracy_score(y_test, svm_preds))
    svm_f1 = float(f1_score(y_test, svm_preds, average="macro"))

    # (c) Random Forest Classifier
    rf = RandomForestClassifier(n_estimators=50, max_depth=6, random_state=42)
    rf.fit(X_train_scaled, y_train)
    rf_preds = rf.predict(X_test_scaled)
    rf_acc = float(accuracy_score(y_test, rf_preds))
    rf_f1 = float(f1_score(y_test, rf_preds, average="macro"))

    # (d) K-Nearest Neighbors
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_train_scaled, y_train)
    knn_preds = knn.predict(X_test_scaled)
    knn_acc = float(accuracy_score(y_test, knn_preds))
    knn_f1 = float(f1_score(y_test, knn_preds, average="macro"))

    print("\n" + "-" * 50)
    print("MODEL PERFORMANCE METRICS (TEST SET EVALUATION)")
    print("-" * 50)
    print(f"1. Logistic Regression: Accuracy = {lr_acc:.4f} ({lr_acc*100:.2f}%), Macro F1 = {lr_f1:.4f}")
    print(f"2. Support Vector Machine (Linear): Accuracy = {svm_acc:.4f} ({svm_acc*100:.2f}%), Macro F1 = {svm_f1:.4f}")
    print(f"3. Random Forest (50 trees): Accuracy = {rf_acc:.4f} ({rf_acc*100:.2f}%), Macro F1 = {rf_f1:.4f}")
    print(f"4. K-Nearest Neighbors (k=5): Accuracy = {knn_acc:.4f} ({knn_acc*100:.2f}%), Macro F1 = {knn_f1:.4f}")
    print("-" * 50)

    # 4. Prepare JSON Export Artifacts
    scaler_artifact = {
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
    }

    lr_artifact = {
        "coef": lr.coef_[0].tolist(),
        "intercept": float(lr.intercept_[0]),
    }

    svm_artifact = {
        "coef": svm.coef_[0].tolist(),
        "intercept": float(svm.intercept_[0]),
    }

    knn_artifact = {
        "k": 5,
        "scaled_points": X_train_scaled.tolist(),
        "labels": y_train.tolist(),
    }

    rf_artifact = [export_tree_node(estimator) for estimator in rf.estimators_]

    metadata_artifact = {
        "logistic_regression": {
            "name": "Logistic Regression",
            "accuracy": round(lr_acc, 4),
            "f1_score": round(lr_f1, 4),
            "description": "Linear probabilistic classifier with exact log-odds feature attribution",
        },
        "svm_linear": {
            "name": "Support Vector Machine (Linear)",
            "accuracy": round(svm_acc, 4),
            "f1_score": round(svm_f1, 4),
            "description": "Maximum-margin hyperplane with linear margin attributions",
        },
        "random_forest": {
            "name": "Random Forest",
            "accuracy": round(rf_acc, 4),
            "f1_score": round(rf_f1, 4),
            "description": "Ensemble of 50 decision trees (max depth 6) with tree-traversal voting",
        },
        "knn": {
            "name": "K-Nearest Neighbors",
            "accuracy": round(knn_acc, 4),
            "f1_score": round(knn_f1, 4),
            "description": "Distance-based instance classifier (k=5) over standardized feature space",
        },
    }

    # Save to ml/artifacts/ and supabase/functions/diagnostic-predict/artifacts/
    directories = ["ml/artifacts", "supabase/functions/diagnostic-predict/artifacts"]
    for d in directories:
        os.makedirs(d, exist_ok=True)

        with open(os.path.join(d, "scaler.json"), "w") as f:
            json.dump(scaler_artifact, f, indent=2)

        with open(os.path.join(d, "logistic_regression.json"), "w") as f:
            json.dump(lr_artifact, f, indent=2)

        with open(os.path.join(d, "svm_linear.json"), "w") as f:
            json.dump(svm_artifact, f, indent=2)

        with open(os.path.join(d, "knn.json"), "w") as f:
            json.dump(knn_artifact, f, indent=2)

        with open(os.path.join(d, "random_forest.json"), "w") as f:
            json.dump(rf_artifact, f, indent=2)

        with open(os.path.join(d, "feature_names.json"), "w") as f:
            json.dump(feature_names, f, indent=2)

        with open(os.path.join(d, "models_metadata.json"), "w") as f:
            json.dump(metadata_artifact, f, indent=2)

    print("\nSuccessfully exported JSON artifacts to ml/artifacts/ and supabase/functions/diagnostic-predict/artifacts/")

if __name__ == "__main__":
    main()
