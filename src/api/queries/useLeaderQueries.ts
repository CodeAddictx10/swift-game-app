import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../constant";

interface Leaderboard {
    userId: string;
    username: string;
    wins: number;
}
const getLeaderboard = async (): Promise<Leaderboard[]> => {
    const response = await fetch(ENDPOINTS.STATS.LEADERBOARD, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to get leaderboard" }));
        throw new Error(error.message || "Failed to get leaderboard");
    }

    return response.json();
};

export function useLeaderboard() {
    const leaderboardQuery = useQuery({
        queryKey: ["leaderboard"],
        queryFn: () => getLeaderboard(),
        retry: (failureCount: number, error: Error) => {
            if (error instanceof Error && error.message.includes("401")) {
                return false;
            }
            return failureCount < 3;
        },
    });

    return {
        leaderboard: leaderboardQuery.data,
        isLoading: leaderboardQuery.isLoading,
        error: leaderboardQuery.error,
    };
}
