export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
    AUTH: {
        AUTHENTICATE: `${API_URL}/api/v1/auth`,
        ME: `${API_URL}/api/v1/auth/me`,
    },
    STATS: {
        USER: `${API_URL}/api/v1/stats`,
        LEADERBOARD: `${API_URL}/api/v1/stats/leaderboard`,
    },
};