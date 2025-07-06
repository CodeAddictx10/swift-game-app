import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type SocketStore = {
    socket: Socket | null;
    isConnected: boolean;
    isConnecting: boolean;
    connect: (token: string) => void;
    disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    isConnected: false,
    isConnecting: false,

    connect: (token: string) => {
        if (get().socket || get().isConnecting) return; // avoid reconnecting
        set({ isConnecting: true });

        const socket = io(import.meta.env.VITE_API_URL, {
            withCredentials: true,
            auth: { token },
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
            set({ isConnected: true, isConnecting: false });
        });

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            set({ isConnected: false, isConnecting: false });
        });

        set({ socket });
    },

    disconnect: () => {
        const socket = get().socket;
        socket?.disconnect();
        set({ socket: null, isConnected: false, isConnecting: false });
    },
}));
