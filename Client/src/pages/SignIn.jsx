import SigninForm from "../components/SigninForm"


const SignIn = () => {
  return (
    <div className='relative flex justify-center items-center h-[100vh]'>
      <div className='bg-slate-800 shadow-md shadow-black bg-opacity-80'>
        <SigninForm />
      </div>
    </div>
  )
}

export default SignIn
