import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CircleX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/Countdown";
import { useGameSession } from "@/hooks/use-game-session";
import { useRouter } from "@tanstack/react-router";
import { useSocketStore } from "@/store/socket.store";
import type { GameSession } from "@/types";
import { cn } from "@/lib/utils";

export default function GameSession() {
    const { gameUpdate } = useGameSession();
    const isConnected = useSocketStore((state) => state.isConnected);
    const isConnecting = useSocketStore((state) => state.isConnecting);
    const type = gameUpdate?.type;
    const data = gameUpdate?.data;
    const hasGameInit = (type === "sessionInit" && data?.id != null) || type === "sessionStarted";

    const router = useRouter();
    console.log(gameUpdate);

    const handleJoinGame = () => {
        if (data?.id) {
            router.navigate({ to: `/arena/$id`, params: { id: data.id } }); //game
        }
    };
    if (isConnecting) {
        return (
            <CardComponent>
                <CardContent>
                    <span>Connecting you to the server...</span>
                </CardContent>
            </CardComponent>
        );
    }

    if (!isConnected && !isConnecting) {
        return (
            <CardComponent className="h-full flex flex-col items-center justify-center">
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xl">
                        <CircleX className="h-5 w-5 text-red-500" />
                        <p>You are not connected to the server!!!</p>
                        <RefreshCcw className="h-5 w-5 cursor-pointer" onClick={() => window.location.reload()} />
                    </div>
                    <span className="text-xs"> Kindly login if you are not already logged in or please refresh the page.</span>
                </CardContent>
            </CardComponent>
        );
    }

    return (
        <CardComponent className="col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    {hasGameInit ? <Clock className="h-7 w-7" /> : <CircleX className="h-7 w-7 text-red-500" />}
                    {hasGameInit ? <span>There is an active session</span> : <span>No active session</span>}
                </CardTitle>
                {hasGameInit && (
                    <CardDescription className="text-white text-sm">
                        Join the active game session and pick your lucky number!
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {type === "sessionInit" &&
                    (data?.id ? (
                        <ActiveSession data={data as GameSession} handleJoinGame={handleJoinGame} />
                    ) : (
                        <WaitingForNewSession data={data as GameSession} />
                    ))}

                {type === "sessionStarted" && gameUpdate?.data && (
                    <ActiveSession data={gameUpdate.data as GameSession} handleJoinGame={handleJoinGame} />
                )}

                {type === "sessionEnded" && <WaitingForNewSession data={gameUpdate?.data as GameSession} />}
            </CardContent>
        </CardComponent>
    );
}

// --------------------- Components ---------------------

const ActiveSession = ({ data, handleJoinGame }: { data: GameSession | null; handleJoinGame: () => void }) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-y-2 mb-10">
                <span className="text-base">Session ends in: </span>
                <Countdown duration={data?.timeLeft} textClassName="text-5xl" />
            </div>

            <Button
                onClick={handleJoinGame}
                className="w-full h-14 text-lg"
                disabled={(data?.timeLeft && data?.timeLeft <= 0) || !data?.id}>
                {data?.timeLeft && data?.timeLeft <= 0 ? "Session Ended" : "Join Game"}
            </Button>
        </>
    );
};

const WaitingForNewSession = ({ data }: { data: GameSession | undefined }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            <span className="text-base">A new session will start in: </span>
            <Countdown duration={data?.nextSessionStart} textClassName="text-5xl" />
        </div>
    );
};

const CardComponent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <Card className={cn("col-span-3 flex flex-col gap-y-4 pb-6 h-max", className)}>{children}</Card>;
};
