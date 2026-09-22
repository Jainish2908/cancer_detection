import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — BreastCare AI" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { isAdmin } = useAuth();

  return (
    <AuthGuard>
      {isAdmin ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <Navigate to="/patient/dashboard" replace />
      )}
    </AuthGuard>
  );
}
