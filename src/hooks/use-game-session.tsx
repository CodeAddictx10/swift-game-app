import { useSocketStore } from "@/store/socket.store";
import { useEffect, useState } from "react";

type GameUpdate =
    | {
          type: "sessionStarted";
          data: {
              id: string;
              timeLeft: number;
              // participantCount: number;
              // userParticipated: boolean;
              duration: number;
              nextSessionStart: number;
          };
      }
    | {
          type: "sessionEnded";
          data: {
              id: string;
              winningNumber: number;
              timeLeft: number;
              nextSessionStart: number;
          };
      }
    | {
          type: "sessionInit";
          data: {
              id: string;
              timeLeft: number;
              nextSessionStart: number;
          };
      };

export function useGameSession() {
    const socket = useSocketStore((state) => state.socket);
    const isConnected = useSocketStore((state) => state.isConnected);
    const [gameUpdate, setGameUpdate] = useState<GameUpdate | null>(null);

    useEffect(() => {
        if (!socket || !isConnected) return;

        socket.emit("sessionInit");

        socket.on("sessionEvents", (update: GameUpdate) => {
            setGameUpdate(update);
        });

        return () => {
            socket.off("sessionEvents");
        };
    }, [socket, isConnected]);

    return {
        isConnected,
        gameUpdate,
        clearGameUpdate: () => setGameUpdate(null),
    };
}
