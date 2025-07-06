import { authStore } from "@/store/auth.store";
import type { AuthResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ENDPOINTS } from "../constant";

const authenticate = async (username: string): Promise<AuthResponse> => {
    const response = await fetch(ENDPOINTS.AUTH.AUTHENTICATE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Authentication failed" }));
        throw new Error(error.message || "Authentication failed");
    }

    return response.json();
};

export function useAuthMutation() {
    const authenticateMutation = useMutation({
        mutationFn: (username: string) => authenticate(username),
        onSuccess: (data: AuthResponse) => {
            authStore.getState().login(data.token, data.user);
        },
        onError: (error: Error) => {
            console.error("Authentication error:", error);
            authStore.getState().logout();
        },
    });

    return {
        authenticateAsync: authenticateMutation.mutateAsync,
        isAuthenticating: authenticateMutation.isPending,
        authenticateError: authenticateMutation.error,
    };
}
