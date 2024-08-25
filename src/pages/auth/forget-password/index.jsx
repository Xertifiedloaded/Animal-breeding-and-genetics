import React, { useState } from 'react';
import axios from 'axios';



export default function ForgetPassword() {
    const forgetPassword=''
    
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(forgetPassword, { email });
            console.log(response);

            setSuccessMessage(response.data.message);
            // navigate('/resetpassword')
        } catch (error) {
            setError('An error occurred while sending the reset password email');
            console.error('Error sending reset password email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div >
            <div >
                <h2>Forget Password</h2>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p >{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Reset Password'}</button>
                </form>
            </div>
        </div>
    );
}
