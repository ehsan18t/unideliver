import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'

const useFilteredItems = (tableName, key, value) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const itemsQuery = query(collection(db, tableName), where(key, '==', value))
    const unsubscribeItems = onSnapshot(itemsQuery, (snapshot) => {
      const itemList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(itemList)
    })

    return () => {
      unsubscribeItems()
    }
  }, [tableName, key, value])

  return items
}

export default useFilteredItems
