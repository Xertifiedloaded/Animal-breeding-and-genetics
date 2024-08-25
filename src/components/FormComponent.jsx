import React from 'react'
import { Input } from './Input'
import Button from './Button'




export default function FormComponent({ loading, text, handleSubmit, payload, styleName, title, handleChange }) {

    return (
        <>

            <form onSubmit={handleSubmit} className=" ">
                <h2 className="text-4xl  font-semibold mb-10">{title}</h2>
                <Input payload={payload} handleChange={handleChange} />
                <Button text={loading ? 'Loading' : text} styles={styleName} type='submit' />
            </form>

        </>
    )
}
