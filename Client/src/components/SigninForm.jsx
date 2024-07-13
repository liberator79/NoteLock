import React, { useRef, useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import authenticate from '../validate/aunthenticate'
import { ValidateSingin } from '../validate/validator'
import { UserContext } from '../context/UserContext'


const SigninForm = () => {
    const navigate = useNavigate();
    const email = useRef();
    const [authError, setAuthError] = useState(null);
    const [loading, setLoading] = useState(false);
    const password = useRef();
    const [error, setError] = useState()
    const userState = useContext(UserContext)
    const handleSignIn = async () => {
        const responce = ValidateSingin(email.current.value, password.current.value);
        if (responce) {
            setError(responce);
            return
        }
        setLoading(true)
        const userData = await authenticate(email.current.value, password.current.value);
        console.log(userData)
        if (userData?.error) {
            let errorMessage = null;
            switch (userData?.error) {
                case "auth/invalid-login-credentials":
                    errorMessage = "Invalid login credentials."
                    break;
                case "ERR_INTERNET_DISCONNECTED":
                    errorMessage = "Check you connection"
                    break;

                default:
                    errorMessage = "Something went wrong with your credentials."
                    break;
            }
            setLoading(false)
            setAuthError(errorMessage);
            return;
        }
        if (userData?.token) {
            localStorage.setItem("key", userData.token);
            userState.setUser(userData.token)
            navigate("/")
        }
    }
    return (
        <div>
            <div>

                <div className='flex flex-col justify-center items-start px-12 py-20'>
                    <div className='pb-5'>
                        <span className='font-bold text-3xl text-white'>Sign In</span>
                    </div>
                    <div className='error px-1 py-2 text-red-600 text-xs text-wrap w-[100%] p-2'>
                        {authError}
                    </div>
                    <div>
                        <input
                            onClick={() => {
                                setError(null)
                                setAuthError(null)
                            }}
                            ref={email}
                            type="text"
                            placeholder="email"
                            name="email"
                            className={`px-4 py-4 w-full bg-slate-700 text-white border-b-2 rounded-[4px] focus:bg-gray-900 focus-visible:outline-none text-sm bg-opacity-70 ${error?.name ? 'border-red-600' : 'border-transparent'}`}
                        />
                        <p className='error px-1 py-2 text-red-600 text-xs'>{error?.email}</p>
                    </div>
                    <div>
                        <input
                            onClick={() => {
                                setError(null)
                                setAuthError(null)
                            }}
                            ref={password}
                            type="password"
                            placeholder="password"
                            name="email"
                            className={`px-4 py-4 w-full bg-slate-700 text-white border-b-2 rounded-[4px] focus:bg-gray-900 focus-visible:outline-none text-sm bg-opacity-70 ${error?.name ? 'border-red-600' : 'border-transparent'}`}

                        />
                        <p className='error px-1 py-2 text-red-600 text-xs'>{error?.password}</p>
                    </div>
                    <div className='w-[100%]'>
                        <button className='bg-red-600 rounded-[4px] p-2 text-white w-[100%]' disabled={loading ? true : false} onClick={handleSignIn}>
                            {loading ? <div className='flex justify-center items-center w-[100%] h-[100%]'>
                                <div className='w-5 h-5 border-4 m-[2px] border-white border-dotted rounded-full animate-spin '></div>
                            </div> : "Signin"}
                        </button>
                    </div>

                </div>
                <div className='p-3 flex justify-center items-center pb-5'>
                    <span className='text-slate-400'>New to NoteLock ? <span className='text-white font-semibold'><Link to="/signup">Sign up now</Link></span></span>
                </div>
            </div>
        </div>
    )
}

export default SigninForm