// useUserData.js
import { useState, useEffect } from 'react'
import { db } from '@/config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const useUserData = (userId) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const userRef = doc(db, 'users', userId)
    const unsubscribeSnapshot = onSnapshot(userRef, (userSnapshot) => {
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data()
        setUserData(userData)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => {
      unsubscribeSnapshot()
    }
  }, [userId])

  return { userData, loading }
}

export default useUserData
