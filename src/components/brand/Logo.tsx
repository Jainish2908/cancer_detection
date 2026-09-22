import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function Logo({ subtitle = true }: { subtitle?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="BreastCare AI home">
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Activity className="size-5" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-accent" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold tracking-tight">
          BreastCare AI
        </span>
        {subtitle && (
          <span className="block text-[11px] text-muted-foreground">Research decision support</span>
        )}
      </span>
    </Link>
  );
}
