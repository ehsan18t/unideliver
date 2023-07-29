import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from 'firebase/firestore'
import { db, auth } from '@/config/firebase'

const useCartItems = () => {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const unsubscribeUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribeUser()
    }
  }, [])

  useEffect(() => {
    if (user) {
      const cartItemsQuery = query(
        collection(db, 'cart'),
        where('uid', '==', user.uid),
      )
      const unsubscribeCartItems = onSnapshot(
        cartItemsQuery,
        async (snapshot) => {
          const cartItemsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          // Fetch items using Promise.all
          const itemPromises = cartItemsList.map((cartItem) => {
            const itemRef = doc(collection(db, 'items'), cartItem.itemId)
            return getDocs(itemRef).then((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          })

          try {
            const items = await Promise.all(itemPromises)

            // Merge cart items with the corresponding items from the 'items' table
            const mergedItemList = cartItemsList.map((cartItem, index) => ({
              ...cartItem,
              item: items[index] || null,
            }))

            setCartItems(mergedItemList)
          } catch (error) {
            console.error('Error fetching items:', error)
            setCartItems([])
          }
        },
      )

      return () => {
        unsubscribeCartItems()
      }
    } else {
      setCartItems([])
    }
  }, [user])

  return { user, cartItems }
}

export default useCartItems
