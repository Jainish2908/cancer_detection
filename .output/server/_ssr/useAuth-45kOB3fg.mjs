import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-45kOB3fg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadUserData = (0, import_react.useCallback)(async (userId) => {
		if (!userId) {
			setProfile(null);
			setRoles([]);
			return;
		}
		const [profileRes, rolesRes] = await Promise.all([supabase.from("profiles").select("id, full_name, mobile, email, address, age, assessment_completed").eq("id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId)]);
		setProfile(profileRes.data ?? null);
		setRoles((rolesRes.data ?? []).map((r) => r.role));
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			if (!active) return;
			setSession(nextSession);
			loadUserData(nextSession?.user?.id);
		});
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			await loadUserData(data.session?.user?.id);
			if (active) setLoading(false);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, [loadUserData]);
	const refresh = (0, import_react.useCallback)(async () => {
		const { data } = await supabase.auth.getSession();
		setSession(data.session);
		await loadUserData(data.session?.user?.id);
	}, [loadUserData]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setSession(null);
		setProfile(null);
		setRoles([]);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		profile,
		roles,
		loading,
		isAdmin: roles.includes("admin"),
		isPatient: roles.includes("patient"),
		refresh,
		signOut
	}), [
		session,
		profile,
		roles,
		loading,
		refresh,
		signOut
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
