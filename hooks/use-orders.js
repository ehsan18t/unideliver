import { useState, useEffect } from 'react'
import { auth, db } from '@/config/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const useUserOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const ordersQuery = query(
          collection(db, 'orders'),
          where('uid', '==', user.uid),
        )

        const unsubscribeSnapshot = onSnapshot(ordersQuery, (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setOrders(ordersData)
          setLoading(false)
        })

        return () => {
          unsubscribeSnapshot()
        }
      } else {
        setOrders([])
        setLoading(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { orders, loading }
}

export default useUserOrders
