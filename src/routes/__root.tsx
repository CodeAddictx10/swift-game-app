import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { authStore } from '@/store/auth.store'
import { useSocketStore } from '@/store/socket.store'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import TanStackQueryLayout from '@/components/query-layout'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
        component: RootComponent,
});

function RootComponent() {
    const token = authStore((state) => state.token);
    const isAuthenticated = authStore((state) => state.isAuthenticated);
    const connect = useSocketStore((state) => state.connect);
    const disconnect = useSocketStore((state) => state.disconnect);

    useEffect(() => {
        if (isAuthenticated && token) {
            connect(token);
        } else {
            disconnect();
        }

        return () => disconnect();
    }, [isAuthenticated, token]);
    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
            <TanStackQueryLayout />
            <Toaster position="top-right" richColors />
        </>
    );
}
