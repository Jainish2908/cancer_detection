import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const FULL_DISCLAIMER =
  "BreastCare AI provides research-based AI decision-support information and does not provide a medical diagnosis. AI results should be reviewed with a qualified healthcare professional.";

export const SHORT_DISCLAIMER =
  "Research decision support only — not a medical diagnosis. Consult a qualified healthcare professional.";

export function MedicalDisclaimer({
  variant = "full",
  className,
}: {
  variant?: "full" | "short";
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className={cn(
        "flex gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-foreground",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
      <p>
        <span className="font-semibold">Medical disclaimer: </span>
        {variant === "full" ? FULL_DISCLAIMER : SHORT_DISCLAIMER}
      </p>
    </div>
  );
}
