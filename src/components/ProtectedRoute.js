import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); 
    const [session, setSession] = useState(null); 

    useEffect(() => {
      const checkSession = async () => {
        const currentSession = await getSession();
        setSession(currentSession); 

        if (!currentSession) {
          setLoading(false);
          router.push('/auth/login'); 
        } else {
          setLoading(false); 
          if (router.pathname === '/auth/create' || router.pathname === '/auth/login') {
            router.push('/dashboard/admin'); 
          }
        }
      };
      
      checkSession();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; 
    }
    if (router.pathname === '/dashboard/admin' && !session) {
      router.push('/auth/login'); 
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
