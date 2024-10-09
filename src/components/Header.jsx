'use client'
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Header = ({ session }) => {
  const router = useRouter();
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch('/api/ip-address');
      const data = await response.json();
      setIp(data.ip);
    };

    fetchIp();
  }, []);


  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="flex text-xs justify-between items-center bg-gray-800 text-white p-4 sticky top-0 z-20">
      {session ? (
        <>
          <div className="flex space-x-4">
            {router.pathname === '/' ? (
              <button 
                onClick={() => handleNavigation('/dashboard/admin')}
                className={`px-1 py-2 rounded hover:bg-gray-600`}
              >
                View Dashboard
              </button>
            ) : (
              <button 
                onClick={() => handleNavigation('/')}
                className={`px-1 py-2 rounded hover:bg-gray-600`}
              >
                View as Visitor
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <small>Welcome, {session.user.name}!</small>
            <small className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/auth/login" })}>
              Log out
            </small>
          </div>
        </>
      ) : (
        <small>Welcome, Alumni! {ip}</small>
      )}
    </div>
  );
};

export default Header;
