import { authStore } from "@/store/auth.store";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../constant";

export const getCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch(ENDPOINTS.AUTH.ME, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to get user info" }));
        throw new Error(error.message || "Failed to get user info");
    }

    return response.json();
};

export function useCurrentUser() {
    const token = authStore((state) => state.token);

    const currentUserQuery = useQuery({
        queryKey: ["me"],
        queryFn: () => getCurrentUser(token!),
        enabled: !!token,
        staleTime: 60 * 60 * 1000, // 1 hour
        retry: (failureCount: number, error: Error) => {
            if (error instanceof Error && error.message.includes("401")) {
                return false;
            }
            return failureCount < 3;
        },
    });

    return {
        user: currentUserQuery.data,
        isLoading: currentUserQuery.isLoading,
        error: currentUserQuery.error,
        refetch: currentUserQuery.refetch,
    };
}
