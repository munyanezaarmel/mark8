import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const { isAuthenticated, isPending } = useAuth();

    useEffect(() => {
      if (!isPending && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, isPending, router]);

    if (isPending) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
}