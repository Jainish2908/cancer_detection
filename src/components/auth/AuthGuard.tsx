import { ReactNode } from "react";
import { Navigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
  requireAssessment?: boolean;
  requireAdmin?: boolean;
}

export function AuthGuard({
  children,
  requireAssessment = false,
  requireAdmin = false,
}: AuthGuardProps) {
  const { session, profile, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="mt-3 text-sm text-muted-foreground">Verifying authentication...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" search={{ redirect: location.href }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/patient/dashboard" replace />;
  }

  if (requireAssessment && !profile?.assessment_completed) {
    return <Navigate to="/assessment" replace />;
  }

  return <>{children}</>;
}
