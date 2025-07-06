import { Button } from "@/components/ui/button";
import { authStore } from "@/store/auth.store";
import { useRouter } from "@tanstack/react-router";

export default function Header() {
    const router = useRouter();
    const user = authStore((state) => state.user);
    const logout = authStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.navigate({ to: "/auth" });
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">SwiftGame</h1>
            <div className="flex items-center justify-end gap-2">
                <p className="text-muted-foreground text-sm md:text-base hidden sm:block">Hi, {user?.username}!</p>
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
