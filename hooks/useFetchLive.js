import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase' // Update this import to match your Firebase setup

const useFetchLive = (tableName, fieldName, value) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, tableName), where(fieldName, '==', value))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(newData)
        setLoading(false)
      })

      return () => unsubscribe()
    }

    fetchData()
  }, [tableName, fieldName, value])

  return { data, loading }
}

export default useFetchLive
