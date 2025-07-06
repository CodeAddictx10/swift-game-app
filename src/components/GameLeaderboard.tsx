import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { authStore } from "@/store/auth.store";

type LeaderboardBoard = {
    leaderboard: any;
};

export default function Leaderboard({ leaderboard }: LeaderboardBoard) {
    const user = authStore((state) => state.user);

    return (
        <Card className="col-span-2 md:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize text-xl">
                    <Trophy className="h-5 w-5 text-green-500" />
                    List of Active Players
                </CardTitle>
            </CardHeader>
            <CardContent>
                {leaderboard.length > 0 ? (
                    <div className="space-y-2">
                        {leaderboard.map(
                            (player: { id: string; username: string; isWinner?: boolean }, index: number) => (
                                <LeaderboardItem key={player.id} player={player} index={index} userId={user?.id} />
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

const LeaderboardItem = ({
    player,
    index,
    userId,
}: {
    player: { id: string; username: string; isWinner?: boolean };
    index: number;
    userId?: string | null;
}) => {
    return (
        <div className="flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
                <b>{index + 1}.</b>
                <span className={player.id === userId ? "font-bold" : ""}>
                    {player.id === userId ? "You" : player.username}
                </span>
            </div>
            {player.isWinner != null && (
                <Badge variant="secondary" className={player.isWinner ? "text-2xl" : "text-sm"}>
                    {player.isWinner ? "🎉" : "❌"}
                </Badge>
            )}
        </div>
    );
};
