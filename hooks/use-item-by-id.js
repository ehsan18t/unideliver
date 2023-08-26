import { useState, useEffect } from 'react'
import { db } from '@/config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const useItemById = (tableName, itemId) => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getItem = async () => {
      try {
        const itemRef = doc(db, tableName, itemId)
        const itemSnapshot = await getDoc(itemRef)

        if (itemSnapshot.exists()) {
          setItem({ id: itemSnapshot.id, ...itemSnapshot.data() })
        } else {
          setItem(null)
        }
      } catch (error) {
        console.error('Error fetching item data:', error)
        setItem(null)
      }
      setLoading(false)
    }

    getItem()
  }, [tableName, itemId])

  return { item, loading }
}

export default useItemById
