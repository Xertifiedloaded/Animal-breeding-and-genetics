import React from 'react'


export default function Confirmation() {
    return (
        <>
           <div>
           <title>Account Verified</title>
           <div >
                <div>
                    <div >
                        <div>
             
                        </div>
                        <div >
                           <h1>Account Verified Successfully!</h1>
                           <p style={{margin:"10px 0"}}>Your account has been successfully verified. You can now login to dashboard.</p>
                            <a href={'/auth/login'}>

                                <button >
                                    Login
                                </button>
                            </a>
                        </div>

                    </div>

                </div>

            </div>
           </div>
        </>
    )
}


