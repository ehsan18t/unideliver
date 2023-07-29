'use client'
import './signin.css'
import { FcGoogle } from 'react-icons/fc'
import { auth, googleProvider, db } from '@/config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LiaSignOutAltSolid } from 'react-icons/lia'

const SignIn = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the user details from the result object
        const user = result.user
        toast.success('Login successful!', {
          position: 'bottom-right',
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
          position: 'bottom-right',
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
    <div className="signin-container pb-6">
      {user ? (
        <div className="w-full flex justify-between px-1 gap-1 items-center">
          <h4>{user.displayName}</h4>
          <button onClick={handleSignOut}>
            <LiaSignOutAltSolid className="h-10 w-10 p-1 text-red-500 hover:bg-gray-800 hover:text-white rounded-full transition duration-200 ease-in-out" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button className="signin-button" onClick={signInWithGoogle}>
            <FcGoogle className="mr-2 h-8 w-8" />
            Sign in
          </button>
        </div>
      )}
    </div>
  )
}

export default SignIn
