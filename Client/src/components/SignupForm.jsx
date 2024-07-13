import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ValidateSingup } from '../validate/validator'
import registerUser from '../validate/registerUser'

const SignupForm = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState(null)
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const handleSignUp = async () => {

        const responce = ValidateSingup(name.current.value, email.current.value, password.current.value);
        if (responce) {
            setError(responce);
            return;
        }
        setLoading(true);
        const userData = await registerUser(name.current.value, email.current.value, password.current.value);
        if (userData?.error) {
            let errorMessage = null;
            switch (userData?.error?.code) {
                case "auth/email-already-in-use":
                    errorMessage = "Email you provided is already registered."
                    break;
                case "ERR_INTERNET_DISCONNECTED":
                    errorMessage = "Check you connection"
                    break;
                default:
                    errorMessage = "Something went wrong with your credentials."
                    break;
            }
            setAuthError(errorMessage);
            setLoading(false)
            return;
        }
        if (userData?.token) {
            localStorage.setItem("key", userData.token);
            
        }

    }
    return (
        <div>
            <div className='flex flex-col justify-center items-start px-16 py-10 pb-10'>
                <div className='pb-5'>
                    <span className='font-bold text-3xl text-white'>Sign Up</span>
                </div>
                <div className='error px-1 py-2 text-red-600 text-xs text-wrap w-[100%] p-2'>
                    {authError}
                </div>
                <div>
                    <input
                        ref={name}
                        onClick={() => {
                            setError(null)
                        }}
                        type="text"
                        placeholder="name"
                        name="name"
                        className={`px-4 py-4 w-full bg-slate-600 text-white border-b-2 rounded-[4px] focus:bg-gray-900 focus-visible:outline-none text-sm bg-opacity-70 ${error?.name ? 'border-red-600' : 'border-transparent'}`}
                    />
                    <p className='error px-1 py-2 text-red-600 text-xs'>{error?.name}</p>
                </div>
                <div>
                    <input
                        ref={email}
                        onClick={() => {
                            setError(null)
                        }}
                        type="text"
                        placeholder="email"
                        name="email"
                        className={` bg-opacity-70 px-4 py-4 w-full bg-slate-600 text-white border-b-2 rounded-[4px] focus:bg-gray-900 focus-visible:outline-none text-sm ${error?.email ? 'border-red-600' : 'border-transparent'}`}
                    />
                    <div className='error px-1 py-2 text-red-600 text-xs'>{error?.email}</div>
                </div>
                <div>
                    <input
                        ref={password}
                        onClick={() => {
                            setError(null)
                        }}
                        type="password"
                        placeholder="password"
                        name="email"
                        className={`bg-opacity-70 px-4 py-4 w-full bg-slate-600 border-b-2 text-white rounded-[4px] focus:bg-gray-900 focus-visible:outline-none text-sm ${error?.password ? 'border-red-600' : 'border-transparent'}`}
                    />
                    <p className='error px-1 py-2 text-red-600 text-xs text-wrap w-[100%]'>{error?.password}</p>
                </div>
                <div className='w-[100%]'>
                    <button className='bg-red-600 rounded-[4px] p-2 text-white w-[100%]' disabled={loading ? true : false} onClick={handleSignUp}>
                        {loading ? <div className='flex justify-center items-center w-[100%] h-[100%]'>
                            <div className='w-5 h-5 border-4 m-[2px] border-white border-dotted rounded-full animate-spin '></div>
                        </div> : "Signup"}
                    </button>
                </div>

            </div>
            <div className='p-3 flex justify-center items-center'>
                <span className='text-white font-semibold'>Already a member ? <Link to="/signin">Signin</Link></span>
            </div>
        </div>
    )
}

export default SignupForm