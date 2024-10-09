import { useRouter } from "next/router";
import { useState } from "react";
import cookies from 'js-cookie';
import { LoginInput } from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { signIn } from "next-auth/react"
import ProtectedRoute from "../../../components/ProtectedRoute";

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
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
          if (!payload.email || !payload.password) {
            throw new Error("Please fill all input fields")
          }
          const res = await signIn("credentials", {
            ...payload,
            redirect: false,
          })
          setLoading(false)
          if (res?.error) {
            console.log(res)
            setLoading(false)
            setError("error login")
          }
          setLoading(false)
          setError("")
          router.push("/dashboard/admin")
        } catch (error) {
          setLoading(false)
          console.log(error);
          
        }
      }


  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); 
  };

  
    const styleName = 'w-full  border-0 outline-none bg-black text-white border border-black py-3 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300';

    return (
        <section className="lg:grid block h-screen lg:grid-cols-2">
            <div className="bg hidden lg:block" />
            
            <div className="bgImage lg:p-10 p-4 grid items-center lg:block h-screen lg:h-full">
                
                <form onSubmit={handleSubmit}>
                    <h2 className="text-4xl font-semibold mb-4">Login</h2>
                    <Button   onclick={handleGoogleSignIn} text={'Login With Google'} styles='bg-black text-white text-xs w-full p-4 my-3 rounded-[16px]' type='submit'  />
                    <LoginInput payload={payload} handleChange={handleChange} />
                    <Button text={loading ? "Loading..." : 'Login'} styles={styleName} type='submit' disabled={loading} />
                    <div className="flex justify-between mt-2">
                        <Link className="text-xs font-medium" href='/auth/create'>
                            You don't have an account? <span className="text-blue-600">Register</span>
                        </Link>
                        <Link className="text-xs font-medium underline" href='/auth/forget-password'>Forget Password</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ProtectedRoute(Login);
