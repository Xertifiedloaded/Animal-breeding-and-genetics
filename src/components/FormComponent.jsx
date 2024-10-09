import React from "react"
import { Input } from "./Input"
import Button from "./Button"
import { signIn, useSession } from "next-auth/react"
export default function FormComponent({
  loading,
  text,
  handleSubmit,
  payload,
  styleName,
  title,
  handleChange,
}) {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=" ">
        <h2 className="text-4xl  font-semibold mb-10">{title}</h2>
        <Button
          onclick={handleGoogleSignIn}
          text={"Login With Google"}
          styles="bg-black text-white text-xs w-full p-4 my-3 rounded-[16px]"
          type="submit"
        />
        <Input payload={payload} handleChange={handleChange} />
        <Button
          text={loading ? "Loading" : text}
          styles={styleName}
          type="submit"
        />
      </form>
    </>
  )
}
