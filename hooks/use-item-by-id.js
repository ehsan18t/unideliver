import { useState, useEffect } from 'react'
import { db } from '@/config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const useItemById = (tableName, itemId) => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const itemRef = doc(db, tableName, itemId)
    const unsubscribe = onSnapshot(itemRef, (itemSnapshot) => {
      if (itemSnapshot.exists()) {
        setItem({ id: itemSnapshot.id, ...itemSnapshot.data() })
      } else {
        setItem(null)
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [tableName, itemId])

  return { item, loading }
}

export default useItemById
