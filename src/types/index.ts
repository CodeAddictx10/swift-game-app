export interface User {
    id: string;
    username: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface GameSession {
    id: string;
    sessionId: string;
    timeLeft?: number;
    winningNumber?: number;
    participantsCount?: number;
    participants?: GameParticipant[];
    duration?: number;
    nextSessionStart?: number;
}

export interface GameSessionEnded {
    sessionId: string;
    participants: {
        user: { id: string; username: string };
        isWinner: boolean;
    }[];
    timeLeft: number;
    winningNumber?: number;
}

export interface GameParticipant {
    id: string;
    username: string;
    isWinner?: boolean;
}
