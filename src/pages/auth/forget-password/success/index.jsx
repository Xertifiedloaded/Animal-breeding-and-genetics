import React from 'react';
import { useRouter } from 'next/router';

const PasswordResetConfirmation = () => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center">

          <svg
            className="w-16 h-16 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 11l3 3L22 4M12 22H4a1 1 0 01-1-1V4a1 1 0 011-1h7.68"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Check Your Email
          </h2>
          <p className="text-gray-600 text-center mb-6">
            A link to reset your password has been sent to your email address. Please check your inbox and follow the instructions.
          </p>
          <button
            onClick={handleBackToLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirmation;