import { useState, useEffect } from 'react'
import { auth, db } from '@/config/firebase' // Import your Firebase configuration
import { collection, doc, onSnapshot } from 'firebase/firestore'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userRef = doc(collection(db, 'users'), authUser.uid)
          const unsubscribeSnapshot = onSnapshot(userRef, (userSnapshot) => {
            if (userSnapshot.exists()) {
              // Merge additional fields from Firestore with the authUser object
              const userData = userSnapshot.data()
              setUser({ ...authUser, ...userData })
            } else {
              // If the user document does not exist in Firestore, set user as null
              setUser(null)
            }
          })
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}

export { useAuth }
