import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/AuthForm';
import { redirect } from '@tanstack/react-router';
import { authStore } from '@/store/auth.store';

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const token = authStore.getState().token;
    if (token) {
      return redirect({ to: "/" });
    }
  },
  component: AuthForm,
})
