import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { authStore } from "@/store/auth.store";
import { useLeaderboard } from "@/api/queries/useLeaderQueries";

export default function Leaderboard() {
    const { leaderboard, isLoading, error } = useLeaderboard();
    const user = authStore((state) => state.user);

    return (
        <Card className="col-span-3 md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize text-xl">
                    <Trophy className="h-5 w-5 text-green-500" />
                    Leaderboard
                </CardTitle>
                {!isLoading && !error && (
                    <CardDescription className="text-xs text-left text-muted-foreground">
                        They’re on the board now... but for how long? ⏳ Keep showing up — your win is just one pick
                        away.
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {isLoading && <div className="text-center py-4">Loading...</div>}
                {error && <div className="text-center py-4">Error loading leaderboard</div>}
                {leaderboard && leaderboard.length > 0 ? (
                    <div className="space-y-2">
                        {leaderboard.map(
                            (player: { userId: string; username: string; wins: number }, index: number) => (
                                <LeaderboardItem key={player.userId} player={player} index={index} userId={user?.id} />
                            ),
                        )}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-muted-foreground">No players yet!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --------------------- Components ---------------------

const LeaderboardItem = ({
    player,
    index,
    userId,
}: {
    player: { userId: string; username: string; wins: number };
    index: number;
    userId?: string;
}) => {
    return (
        <div key={player.userId} className={"flex items-center justify-between p-2 rounded-lg bg-muted/50"}>
            <div className="flex items-center gap-2">
                <b>{index + 1}.</b>
                <span className={player.userId === userId ? "font-bold" : "font-medium"}>
                    {player.userId === userId ? "You" : player.username}
                </span>
            </div>
            <Badge variant="secondary" className="text-2xl">
                {player.wins}
            </Badge>
        </div>
    );
};
