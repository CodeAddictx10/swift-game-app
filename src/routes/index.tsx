import { createFileRoute, redirect } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboard";
import { authStore } from "@/store/auth.store";
import { getCurrentUser } from "@/api/queries/useAuthQueries";

export const Route = createFileRoute("/")({
    beforeLoad: async ({ context }) => {
        const token = authStore.getState().token;

        if (!token) {
            throw redirect({
                to: "/auth",
                replace: true,
            });
        }

        try {
            await context.queryClient.ensureQueryData({
                queryKey: ["me"],
                queryFn: () => getCurrentUser(token),
                staleTime: 60 * 60 * 1000,
            });
        } catch (err: any) {
            authStore.setState({ token: null });
            throw redirect({
                to: "/auth",
                replace: true,
            });
        }
    },
    component: Dashboard,
});
