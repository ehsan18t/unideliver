import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebase' // Update this import to match your Firebase setup

const useUpdate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateItem = async (tableName, itemId, newData) => {
    setLoading(true)
    setError(null)

    try {
      const itemRef = doc(db, tableName, itemId)
      await updateDoc(itemRef, newData)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { updateLoading: loading, updateError: error, updateItem }
}

export default useUpdate
