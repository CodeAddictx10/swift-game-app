import Header from "@/components/Header";
import GameSession from "@/components/GameSession";
import Leaderboard from "@/components/Leaderboard";
import Stats from "@/components/Stats";

export function Dashboard() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen">
            <Header />
            <Stats />
            <div className="grid gap-6 md:grid-cols-5 mt-10">
                <GameSession />
                <Leaderboard />
            </div>
        </div>
    );
}
