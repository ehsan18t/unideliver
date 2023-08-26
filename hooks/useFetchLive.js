import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase' // Update this import to match your Firebase setup

const useFetchLive = (tableName) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const query = collection(db, tableName)
      const unsubscribe = onSnapshot(query, (snapshot) => {
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
  }, [tableName])

  return { data, loading }
}

export default useFetchLive
