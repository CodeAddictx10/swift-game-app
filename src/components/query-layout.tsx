import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function LayoutAddition() {
    const isDev = import.meta.env.DEV;
    return isDev ? <ReactQueryDevtools buttonPosition="bottom-right" /> : null;
}
