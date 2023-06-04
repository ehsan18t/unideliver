'use client'

import './signin.css'
import { FcGoogle } from 'react-icons/fc'
import { auth, googleProvider, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const SignIn = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the user details from the result object
        const user = result.user
        console.log(user)

        // Check if the user exists in the "users" table
        const userRef = doc(db, 'users', user.uid)
        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              // User exists, update their login info in the "users" table
              updateDoc(userRef, {
                lastLogin: new Date(),
              })
                .then(() => {
                  console.log('User login info updated')
                })
                .catch((error) => {
                  console.error('Error updating user login info:', error)
                })
            } else {
              // User does not exist, add them to the "users" table
              setDoc(userRef, {
                displayName: user.displayName,
                email: user.email,
                lastLogin: new Date(),
                // Add any other user details you want to store
              })
                .then(() => {
                  console.log('User added to "users" table')
                })
                .catch((error) => {
                  console.error('Error adding user to "users" table:', error)
                })
            }
          })
          .catch((error) => {
            console.error('Error checking user existence:', error)
          })
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
