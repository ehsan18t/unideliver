import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase' // Update this import to match your Firebase setup

const useFetchItemByIdNew = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchItem = async (tableName, itemId) => {
    setLoading(true)
    setError(null)

    try {
      const itemRef = doc(db, tableName, itemId)
      const itemSnapshot = await getDoc(itemRef)

      if (itemSnapshot.exists()) {
        const itemData = itemSnapshot.data()
        setLoading(false)
        return itemData
      } else {
        setLoading(false)
        return null
      }
    } catch (error) {
      setError(error)
      setLoading(false)
      return null
    }
  }

  return { loading, error, fetchItem }
}

export default useFetchItemByIdNew
