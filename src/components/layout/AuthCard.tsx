import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { SHORT_DISCLAIMER } from "@/components/medical/MedicalDisclaimer";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="[&_*]:text-primary-foreground">
          <Logo subtitle={false} />
        </div>
        <div className="space-y-6">
          <h2 className="max-w-sm font-display text-3xl font-bold leading-tight">
            Secure, explainable AI support for breast cancer research
          </h2>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li>Patient-controlled access to protected medical files</li>
            <li>Structured diagnostic analysis with model comparison</li>
            <li>Explanations for every research prediction</li>
          </ul>
        </div>
        <p className="max-w-sm text-xs text-primary-foreground/70">{SHORT_DISCLAIMER}</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="space-y-1.5">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
          {footer}
        </div>
      </main>
    </div>
  );
}
