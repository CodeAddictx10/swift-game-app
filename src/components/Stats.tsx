import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingDown, GamepadIcon } from "lucide-react";
import { useUserStats } from "@/api/queries/useStatsQueries";

export default function Stats() {
    const { stats, isLoading } = useUserStats();

    if (isLoading) {
        return <LoadingStats />;
    }

    if (!stats) {
        return <StatError />;
    }

    return (
        <Card>
            <CardHeader className="p-2 md:p-4">
                <CardTitle className="text-2xl font-bold">Your Game Stats</CardTitle>
                <CardDescription className="text-xs">
                    Every stat tells your story — wins show your power, losses fuel your grind.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-2 md:p-4">
                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                    <div className="flex items-center justify-between p-3 rounded-none bg-muted">
                        <div className="flex items-center gap-2">
                            <GamepadIcon className="h-4 w-4 text-blue-500" />
                            <span className="text-base font-medium">Games Played</span>
                        </div>
                        <Badge variant="secondary" className="text-xl md:text-2xl">
                            {stats.totalGames}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-none bg-muted">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-500" />
                            <span className="text-base font-medium">Win Rate</span>
                        </div>
                        <Badge variant={"secondary"} className="text-xl md:text-2xl">
                            {stats.winPercentage.toFixed(2)}%
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                    <div className="flex items-center justify-between p-3 rounded-none bg-green-100 dark:bg-green-800">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-green-600" />
                            <span className="text-base font-medium text-green-700 dark:text-green-300">Total Wins</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xl md:text-2xl">
                            {stats.totalWins}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-none bg-red-100 dark:bg-red-950">
                        <div className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="text-base font-medium text-red-700 dark:text-red-300">Total Losses</span>
                        </div>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-xl md:text-2xl">
                            {stats.totalLoses}
                        </Badge>
                    </div>
                </div>

                {stats.totalGames === 0 && (
                    <div className="text-center py-4">
                        <p className="text-xs text-muted-foreground">
                            Play your first game to see your stats - Go Champ!✨
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --------------------- Components ---------------------

const LoadingStats = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Game Stats</CardTitle>
                <CardDescription>Loading your statistics...</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
            </CardContent>
        </Card>
    );
};

const StatError = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Game Stats</CardTitle>
                <CardDescription>Unable to load statistics</CardDescription>
            </CardHeader>
        </Card>
    );
};
