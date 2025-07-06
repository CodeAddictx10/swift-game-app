import { authStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../constant";

interface UserStats {
    totalGames: number;
    totalWins: number;
    totalLoses: number;
    winPercentage: number;
}
const getUserStats = async (token: string): Promise<UserStats> => {
    const response = await fetch(ENDPOINTS.STATS.USER, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to get user game stats" }));
        throw new Error(error.message || "Failed to get user game stats");
    }

    return response.json();
};

export function useUserStats() {
    const token = authStore((state) => state.token);

    const currentUserQuery = useQuery({
        queryKey: ["stats"],
        queryFn: () => getUserStats(token!),
        enabled: !!token,
        retry: (failureCount: number, error: Error) => {
            console.log(error, "error");

            if (error instanceof Error && error.message.includes("401")) {
                authStore.setState({ token: null, user: null, isAuthenticated: false });
                return false;
            }
            return failureCount < 3;
        },
    });

    return {
        stats: currentUserQuery.data,
        isLoading: currentUserQuery.isLoading,
        error: currentUserQuery.error,
    };
}
