import { useSocketStore } from "@/store/socket.store";
import type { GameParticipant, GameSession, GameSessionEnded } from "@/types";
import { useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useGame() {
    const { id } = useParams({ strict: false });
    const socket = useSocketStore((state) => state.socket);
    const isConnected = useSocketStore((state) => state.isConnected);

    const [participants, setParticipants] = useState<GameParticipant[]>([]);

    const hasInitialized = useRef(false);

    const [session, setSession] = useState<GameSession | null>(null);
    
    const numberSelectionHandler = (number: number) => {
        if (!socket || !isConnected) {
            toast.error("You are not connected to the server");
            return;
        }

        socket.emit("selectNumberInGameSession", { sessionId: id, number });
    };

    useEffect(() => {
        if (!socket || !isConnected) return;

        socket.on("gameSessionJoinError", (error: string) => {
            toast.error(error);
        });

        socket.on("gameSessionJoined", (data: GameSession) => {
            toast.success("Joined game session");
            const { participants: participantsData, ...rest } = data;

            setSession({ ...rest, participantsCount: participantsData?.length });

            setParticipants(participantsData?.sort((_, b) => (b.isWinner ? 1 : -1)) || []);
        });

        socket.on("participantEnteredGameSession", (data: { id: string; participants: GameParticipant[] }) => {
            toast.success("Participant entered game session");
            setParticipants(data.participants.sort((_, b) => (b.isWinner ? 1 : -1)));
        });

        socket.on("currentGameSessionEnded", (data: GameSessionEnded) => {
            toast.success("Game session ended");

            const { participants: participantsData, ...rest } = data;
            setSession({ ...rest, participantsCount: participantsData?.length, id: data.sessionId });

            setParticipants(
                participantsData
                    ?.map((participant) => ({
                        ...participant.user,
                        isWinner: participant.isWinner,
                    }))
                    .sort((_, b) => (b.isWinner ? 1 : -1)),
            );
        });

        socket.on("numberSelectionError", (error: string) => {
            toast.error(error);
        });

        if (!hasInitialized.current) {
            socket.emit("joinGameSession", { sessionId: id });
            hasInitialized.current = true;
        }

        return () => {
            socket.off("gameSessionJoinError");
            socket.off("gameSessionJoined");
            socket.off("participantEnteredGameSession");
            socket.off("currentGameSessionEnded");
            socket.off("numberSelectionError");
        };
    }, [socket, isConnected, id]);

    return {
        session,
        participants,
        numberSelectionHandler,
    };
}
