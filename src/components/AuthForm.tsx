import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useAuthMutation } from "@/api/mutations/useAuthMutation";

const FormSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
});

export function AuthForm() {
    const { authenticateAsync, isAuthenticating } = useAuthMutation();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            await authenticateAsync(data.username);
            toast.success(`Welcome ${data.username}!`);
            router.navigate({ to: "/" });
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Card className="w-full max-w-md flex flex-col gap-y-8 py-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome to the SwiftGame</CardTitle>
                    <CardDescription className="text-sm">Enter your username to start playing</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your username" {...field} />
                                        </FormControl>

                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full cursor-pointer disabled:cursor-not-allowed" disabled={isAuthenticating}>
                                {isAuthenticating ? "Authenticating..." : "Login / Register"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
