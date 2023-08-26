import { useState, useEffect } from 'react'
import { auth } from '@/config/firebase'

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user)
        setLoading(false)
        setError(null)
      },
      (error) => {
        setError(error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  return { currentUser, loading, error }
}

export default useCurrentUser
