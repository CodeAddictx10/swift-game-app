import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Countdown from "@/components/Countdown";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn, getRandomMessage } from "@/lib/utils";
import type { GameSession } from "@/types";

type ArenaProps = {
    session?: GameSession;
    numberSelectionHandler: (number: number) => void;
};

export default function Arena({ session, numberSelectionHandler }: ArenaProps) {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const router = useRouter();

    const isWinner = session?.winningNumber === selectedNumber;

    const isGameOver = session?.timeLeft === undefined || session?.timeLeft <= 0;
    
    const handleNumberSelect = (number: number) => {
        if (!session || (session.timeLeft && session.timeLeft <= 0)) {
            toast.error("Time's up! Wait for the next session to start");
            return;
        }

        if (selectedNumber) {
            toast.error("You can only select one number");
            return;
        }
        numberSelectionHandler(number);
        setSelectedNumber(number);
    };

    return (
        <Card className="col-span-2">
            <CardHeader className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col">
                    <CardTitle className="text-2xl font-bold">
                        {isGameOver ? "Game Over" : "Pick Your Lucky Number"}
                    </CardTitle>
                    <CardDescription>
                        <DescriptionText selectedNumber={selectedNumber} isGameOver={isGameOver} />
                    </CardDescription>
                </div>
                <Countdown duration={session?.timeLeft || 0} size={100} textClassName="text-3xl" />
            </CardHeader>
            <CardContent className="space-y-6">
                {session?.winningNumber ? (
                    <ResultView
                        selectedNumber={selectedNumber}
                        isGameOver={isGameOver}
                        isWinner={isWinner}
                        session={session}
                        navigate={() => router.navigate({ to: "/" })}
                    />
                ) : (
                    <GamePad
                        selectedNumber={selectedNumber}
                        isGameOver={isGameOver}
                        handleNumberSelect={handleNumberSelect}
                        navigate={() => router.navigate({ to: "/" })}
                    />
                )}
            </CardContent>
        </Card>
    );
}

// --------------------- Components ---------------------

const GamePad = ({
    selectedNumber,
    isGameOver,
    handleNumberSelect,
    navigate,
}: {
    selectedNumber: number | null;
    isGameOver: boolean;
    handleNumberSelect: (number: number) => void;
    navigate: () => void;
}) => {
    return (
        <>
            <div className="grid grid-cols-3 mx-auto gap-6 w-max content-center">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                    <Button
                        key={number}
                        variant={selectedNumber === number ? "default" : "outline"}
                        disabled={(selectedNumber !== null && selectedNumber !== number) || isGameOver}
                        className="aspect-square text-lg font-bold flex-center size-16 disabled:!cursor-not-allowed disabled:opacity-50"
                        onClick={() => handleNumberSelect(number)}>
                        {number}
                    </Button>
                ))}
            </div>
            {selectedNumber && !isGameOver && (
                <div className="text-center space-y-4">
                    <p className="text-lg">
                        Selected number: <span className="font-bold text-3xl">{selectedNumber}</span>
                    </p>
                </div>
            )}

            {!isGameOver ? (
                <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-green-600">✅ You're in the game!</p>
                    <p className="text-muted-foreground">Wait for the session to end to see the results</p>
                </div>
            ) : (
                <div className="text-center space-y-4">
                    <p className="text-lg font-semibold text-red-600">This session has elapsed</p>
                    <p className="text-xs">Don't miss out on the next opportunity to win! Join a new game to try your luck again.</p>
                    <Button onClick={() => navigate()} className="px-10 h-14">
                        Join a new game
                    </Button>
                </div>
            )}
        </>
    );
};


const ResultView = ({
    selectedNumber,
    isWinner,
    session,
    navigate,
}: {
    selectedNumber: number | null;
    isGameOver: boolean;
    isWinner: boolean;
    session: GameSession;
    navigate: () => void;
}) => {
    return (
        <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${isWinner ? "text-green-500" : "text-red-500"}`}>
                {isWinner ? "🎉" : "😔"}
            </div>
            <div>
                <p className={cn("text-lg font-semibold", isWinner ? "text-green-500" : "text-red-500")}>
                    {isWinner ? "You Won!" : "You Lost!"}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-muted-foreground mt-2">The winning number was </p>
                    <span className="font-bold text-3xl text-green-500">{session.winningNumber}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-muted-foreground mt-2">Your number: </p>
                    <span className={`font-bold text-3xl ${isWinner ? "text-green-500" : "text-red-500"}`}>
                        {selectedNumber}
                    </span>
                </div>
            </div>
            <p className="text-sm italic font-semibold text-center">
                {getRandomMessage(isWinner ? "winner" : "loser", selectedNumber || 0)}
            </p>
            <Button onClick={() => navigate()}>I want to try my luck again💪</Button>
        </div>
    );
};


const DescriptionText = ({ selectedNumber, isGameOver }: { selectedNumber: number | null; isGameOver: boolean }) => {
    return selectedNumber ? (
        <span className="font-medium">
            You selected <span className="font-bold text-black">{selectedNumber}</span>. Wait for the results!
        </span>
    ) : isGameOver ? (
        <span className="font-normal">This game is over! Kindly join a new game to continue</span>
    ) : (
        <span className="font-normal">Choose a number between 1 and 10 and join the game</span>
    );
};
