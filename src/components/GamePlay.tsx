import { useParams, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Arena from "@/components/Arena";
import GameLeaderboard from "./GameLeaderboard";
import { useGame } from "@/hooks/use-game";
import { cn } from "@/lib/utils";

export function GamePlay() {
    const router = useRouter();
    const { id } = useParams({ strict: false });
    const { session, participants, numberSelectionHandler } = useGame();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex items-center justify-between gap-4 mb-8">
                <Button
                    variant="ghost"
                    className="hover:bg-transparent"
                    size="sm"
                    onClick={() => router.navigate({ to: "/" })}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Button>
            </div>
            <div
                className={cn(
                    "grid gap-6 transition-all duration-400",
                    !session?.id ? "md:grid-cols-1" : "md:grid-cols-3",
                )}>
                <Arena
                    session={{
                        id: id!,
                        timeLeft: session?.timeLeft,
                        winningNumber: session?.winningNumber,
                        sessionId: session?.id!,
                    }}
                    numberSelectionHandler={numberSelectionHandler}
                />
                {session?.id && <GameLeaderboard leaderboard={participants} />}
            </div>
        </div>
    );
}
