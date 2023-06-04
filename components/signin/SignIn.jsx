import './signin.css'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <div className="signin-container">
      <h3>Please Sign In to Use UniDeliver</h3>
      <button>
        <FcGoogle className="mr-2" />
        Sign in with Google
      </button>
    </div>
  )
}

export default SignIn
