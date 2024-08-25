import React from 'react'

export default function Button({ text, styles, type, onclick }) {

    return (
        <>
            <button
                onClick={onclick}
                type={type}
                className={styles}
            >
                {text}
            </button>
        </>
    )
}
