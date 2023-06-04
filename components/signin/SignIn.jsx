'use client'

import './signin.css'
import { FcGoogle } from 'react-icons/fc'
import { auth, googleProvider } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, signOut } from 'firebase/auth'

const SignIn = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the user details from the result object
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        console.error('Google sign-in error:', error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully')
      })
      .catch((error) => {
        console.error('Sign out error:', error)
      })
  }

  return (
    <div className="signin-container">
      {user ? (
        <>
          <h4>Hello, {user.displayName}</h4>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h3>Please Sign In to Use UniDeliver</h3>
          <button onClick={signInWithGoogle}>
            <FcGoogle className="mr-2" />
            Sign in with Google
          </button>
        </>
      )}
    </div>
  )
}

export default SignIn
