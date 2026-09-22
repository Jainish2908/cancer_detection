import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { SHORT_DISCLAIMER } from "@/components/medical/MedicalDisclaimer";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            An M.Sc. Data Science research platform exploring machine learning, explainable AI and
            secure medical data handling for breast cancer early detection support.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="font-display text-sm font-semibold">Platform</h2>
          <Link to="/how-it-works" className="block text-muted-foreground hover:text-foreground">
            How it works
          </Link>
          <Link to="/register" className="block text-muted-foreground hover:text-foreground">
            Create account
          </Link>
          <Link to="/login" className="block text-muted-foreground hover:text-foreground">
            Patient login
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="font-display text-sm font-semibold">Access</h2>
          <Link to="/login" className="block text-muted-foreground hover:text-foreground">
            Administrator login
          </Link>
          <Link to="/register" className="block text-muted-foreground hover:text-foreground">
            Create account
          </Link>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-5">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">{SHORT_DISCLAIMER}</p>
      </div>
    </footer>
  );
}
