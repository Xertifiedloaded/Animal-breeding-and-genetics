

import { useRouter } from "next/router";
import { useState } from "react";
import cookies from 'js-cookie'
import { LoginInput } from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context-provider/AuthProvider";
import Link from "next/link";

const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const styleName = 'w-full bg-blue-500 border-0 outline-none  bg-black text-white  border border-black py-3 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
    const { login, error, setError } = useAuth()
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (error) {
            setError(null);
        }
        setPayload(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(null)
            await login(payload)
            cookies.set('loggedIn', true)
            router.push('/dashboard/admin')
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err.message)
        }
    }

    return (
        <>

            <section className="lg:grid   block  h-screen lg:grid-cols-2  ">
                <div className="bg hidden lg:block" />
                <div className="bgImage lg:p-10 p-4 grid items-center lg:block   h-screen lg:h-full">
                    <form onSubmit={handleSubmit} className="">
                        <h2 className="text-4xl font-semibold mb-4">Login</h2>
                        {error && <small className="text-red-500 mb-4">{error}</small>}
                        <LoginInput payload={payload} handleChange={handleChange} />
                        <Button text={loading ? "loading" : 'Login'} styles={styleName} type='submit' />
                        <div className="flex justify-between mt-2">
                            <Link className="text-xs font-medium" href='/auth/create'>You dont Have an Account? <span className="text-blue-600">Register</span></Link>
                            <Link className="text-xs font-medium underline" href='/auth/forget-password '>Forget Password</Link>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default Login