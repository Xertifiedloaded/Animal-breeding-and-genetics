import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Loader from './loader';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
      const checkSession = async () => {
        const currentSession = await getSession();
        setSession(currentSession);
        const path = router.pathname;
        const isAuthPage = path === '/auth/login' || path === '/auth/create';
        const isDashboardPage = path.startsWith('/dashboard');

        if (currentSession) {
          if (isAuthPage) {
            router.replace('/dashboard/admin');
          } else {
            setLoading(false);
          }
        } else {
          if (isDashboardPage) {
            router.replace('/auth/login');
          } else {
            setLoading(false);
          }
        }
      };
      checkSession();
    }, [router]);

    if (loading) {
      return <Loader/>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;