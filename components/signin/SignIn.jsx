'use client'

import './signin.css'
import { FcGoogle } from 'react-icons/fc'
import { auth, googleProvider, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the user details from the result object
        const user = result.user
        toast.success('Login successful!', {
          position: 'bottom-left',
          autoClose: 2000,
        })

        // Check if the user exists in the "users" table
        const userRef = doc(db, 'users', user.uid)
        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              // User exists, update their login info in the "users" table
              updateDoc(userRef, {
                displayName: user.displayName,
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
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                isAdmin: false,
                isBanned: false,
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
        toast.error('Login failed!', {
          position: 'bottom-left',
          autoClose: 2000,
        })
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.info('Logout Success!', {
          position: 'bottom-left',
          autoClose: 2000,
        })
      })
      .catch((error) => {
        toast.error('Logout failed!', {
          position: 'bottom-left',
          autoClose: 2000,
        })
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
      <ToastContainer />
    </div>
  )
}

export default SignIn
