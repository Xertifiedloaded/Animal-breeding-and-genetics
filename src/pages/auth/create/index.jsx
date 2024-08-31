
import { useState } from "react";
import { useRouter } from "next/router";
import FormComponent from "@/components/FormComponent";
import { useAuth } from "@/context-provider/AuthProvider";
import Link from "next/link";

const CreateUser = () => {
    const styleName = 'w-full bg-blue-500 outline-none  bg-black text-white  border border-black py-3 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
    const { create, error, setError } = useAuth()
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
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
            setLoading(true)
            await create(payload)
            router.push('/auth/otp')
        } catch (err) {

        }
    }

    return (
        <>
            <section className="lg:grid   block  h-screen lg:grid-cols-2  ">
                <div className="bg hidden lg:block" />
                {error && <small className="text-red-500 mb-4">{error}</small>}
                <div className="bgImage lg:p-10 p-4 grid items-center lg:block   h-screen lg:h-full">
                    <FormComponent text='Signup' loading={loading} handleSubmit={handleSubmit} error={error} payload={payload} styleName={styleName} title='SignUp' handleChange={handleChange} />
                    <Link className="text-xs font-medium" href='/auth/login'>Already Have an Account? <span className="text-blue-600">Login</span></Link>
                </div>

            </section>
        </>
    )
}

export default CreateUser