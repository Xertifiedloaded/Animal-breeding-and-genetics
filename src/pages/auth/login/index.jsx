

import { useRouter } from "next/router";
import { useState } from "react";
import cookies from 'js-cookie'
import { LoginInput } from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context-provider/AuthProvider";

const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const styleName = 'w-full bg-blue-500 outline-none  bg-black text-white  border border-black py-3 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
    const { login, } = useAuth()
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>

            <section className="lg:grid   xs:block  h-screen lg:grid-cols-2  ">
                <div className="bg xs:hidden lg:block" />
                <div className="bgImage lg:p-10 xs:p-4 xs:grid xs:items-center lg:block   xs:h-screen lg:h-full">
                    <form onSubmit={handleSubmit} className="">
                        <h2 className="text-4xl font-semibold mb-4">Login</h2>
                        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
                        <LoginInput payload={payload} handleChange={handleChange} />
                        <Button text={loading?"loading":'Login'} styles={styleName} type='submit' />
                    </form>
                </div>

            </section>
        </>
    )
}

export default Login