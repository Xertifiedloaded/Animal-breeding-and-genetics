import React, { useState } from 'react';
import { useRouter } from 'next/router';

const OtpPage = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 4) {
            setError('Please enter a valid 4-digit OTP.');
            return;
        }

        setError('');

        try {
            setLoading(true)
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: otpCode }),
            });


            if (!res.ok) {
                throw new Error('Invalid OTP. Please try again.');

            }
            router.push('/auth/otp/success');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    };

    return (

        <>

            <section className="lg:grid   block  h-screen lg:grid-cols-2  ">
                <div className="bg hidden lg:block" />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
                    <div className="max-w-md w-full p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Enter OTP</h2>

                        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                        <form onSubmit={handleSubmit} className="flex flex-col items-center">
                            <div className="mb-5 flex gap-6">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                            >
                                {loading ? 'Loading' : 'Verify otp'}
                            </button>
                        </form>
                    </div>
                </div>

            </section>




        </>

    );
};

export default OtpPage;