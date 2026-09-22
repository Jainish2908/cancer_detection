import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, Users, FileText, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — BreastCare AI" }],
  }),
  component: AdminDashboardPage,
});

type AuditLogRow = {
  id: string;
  user_id: string | null;
  action: string;
  resource: string | null;
  status: string;
  created_at: string;
};

type AssessmentRow = {
  id: string;
  patient_id: string;
  full_name: string;
  email: string;
  submitted_at: string;
  concern_categories: string[];
};

function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [auditLogs, setAuditLogs] = useState<AuditLogRow[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRow[]>([]);
  const [stats, setStats] = useState({ profilesCount: 0, assessmentsCount: 0, auditLogsCount: 0 });

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [logsRes, assessRes, profilesCountRes, assessCountRes, logsCountRes] = await Promise.all([
          supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(10),
          supabase.from("patient_assessments").select("*").order("submitted_at", { ascending: false }).limit(10),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("patient_assessments").select("id", { count: "exact", head: true }),
          supabase.from("audit_logs").select("id", { count: "exact", head: true }),
        ]);

        setAuditLogs((logsRes.data as AuditLogRow[]) || []);
        setAssessments((assessRes.data as AssessmentRow[]) || []);
        setStats({
          profilesCount: profilesCountRes.count || 0,
          assessmentsCount: assessCountRes.count || 0,
          auditLogsCount: logsCountRes.count || 0,
        });
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  return (
    <AuthGuard requireAdmin>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-3xl font-bold">Admin Portal</h1>
                  <Badge variant="destructive">Admin Access</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  System audit oversight, patient assessment registry, and platform statistics.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex py-12 justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Registered Users</CardTitle>
                      <Users className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.profilesCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Completed Assessments</CardTitle>
                      <FileText className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.assessmentsCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Audit Log Entries</CardTitle>
                      <Activity className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.auditLogsCount}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Audit Logs Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldCheck className="size-5 text-primary" /> Security Audit Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {auditLogs.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">No audit logs recorded yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="border-b border-border text-xs font-semibold text-muted-foreground">
                            <tr>
                              <th className="pb-2">Timestamp</th>
                              <th className="pb-2">Action</th>
                              <th className="pb-2">Resource</th>
                              <th className="pb-2">Status</th>
                              <th className="pb-2">User ID</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {auditLogs.map((log) => (
                              <tr key={log.id}>
                                <td className="py-2.5 text-xs text-muted-foreground">
                                  {new Date(log.created_at).toLocaleString()}
                                </td>
                                <td className="py-2.5 font-medium">{log.action}</td>
                                <td className="py-2.5 font-mono text-xs">{log.resource || "-"}</td>
                                <td className="py-2.5">
                                  <Badge variant={log.status === "success" ? "outline" : "destructive"}>
                                    {log.status}
                                  </Badge>
                                </td>
                                <td className="py-2.5 font-mono text-xs text-muted-foreground">
                                  {log.user_id ? `${log.user_id.substring(0, 8)}...` : "System"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Patient Assessments Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Patient Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {assessments.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">No patient assessments submitted yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="border-b border-border text-xs font-semibold text-muted-foreground">
                            <tr>
                              <th className="pb-2">Submitted</th>
                              <th className="pb-2">Patient Name</th>
                              <th className="pb-2">Email</th>
                              <th className="pb-2">Categories</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {assessments.map((a) => (
                              <tr key={a.id}>
                                <td className="py-2.5 text-xs text-muted-foreground">
                                  {new Date(a.submitted_at).toLocaleDateString()}
                                </td>
                                <td className="py-2.5 font-medium">{a.full_name}</td>
                                <td className="py-2.5 text-muted-foreground">{a.email}</td>
                                <td className="py-2.5">
                                  <div className="flex flex-wrap gap-1">
                                    {a.concern_categories?.map((cat) => (
                                      <Badge key={cat} variant="secondary" className="text-[10px]">
                                        {cat}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>

        <SiteFooter />
      </div>
    </AuthGuard>
  );
}
