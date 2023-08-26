import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/config/firebase' // Update this import to match your Firebase setup

const useAddToFirebase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addToFirebase = async (tableName, data) => {
    setLoading(true)
    setError(null)

    try {
      const collectionRef = collection(db, tableName)
      await addDoc(collectionRef, data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { addLoading: loading, addError: error, addToFirebase }
}

export default useAddToFirebase
