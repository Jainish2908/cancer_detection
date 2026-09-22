import { useState } from "react";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/layout/AuthCard";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Login — BreastCare AI" },
      {
        name: "description",
        content: "Sign in to your BreastCare AI patient or researcher account.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        const emailNotConfirmed =
          error.code === "email_not_confirmed" ||
          error.message.toLowerCase().includes("email not confirmed");

        if (emailNotConfirmed) {
          toast.error("Please confirm your email before logging in.", {
            action: {
              label: "Resend email",
              onClick: async () => {
                const { error: resendError } = await supabase.auth.resend({
                  type: "signup",
                  email: email.trim(),
                });

                if (resendError) {
                  toast.error(
                    resendError.message ||
                      "Unable to resend the confirmation email.",
                  );
                } else {
                  toast.success(
                    "Confirmation email sent. Please check your inbox.",
                  );
                }
              },
            },
          });
        } else {
          toast.error(
            error.message || "Invalid login credentials. Please try again.",
          );
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        toast.success("Successfully logged in.");
        const targetPath = search["redirect"] || "/dashboard";
        navigate({ to: targetPath as never });
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your dashboard and analysis tools"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Register now
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <PasswordField
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
