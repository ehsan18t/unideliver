'use client'

import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import CartItem from '@/components/cart/CartItem'

const fetchUserData = async () => {
  return new Promise((resolve) => {
    const unsubscribeUser = auth.onAuthStateChanged((user) => {
      resolve(user)
      unsubscribeUser()
    })
  })
}

const fetchCartItems = async (userId) => {
  return new Promise((resolve) => {
    const shopsCollection = collection(db, 'cart')
    const unsubscribe = onSnapshot(shopsCollection, (snapshot) => {
      const shopList = snapshot.docs
        .map((doc) => {
          const data = doc.data()
          if (data.uid === userId) {
            return {
              id: doc.id,
              ...data,
            }
          }
          return null
        })
        .filter((item) => item !== null)
      resolve(shopList)
      unsubscribe()
    })
  })
}

const CartItems = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fu = async () => {
      const user = await fetchUserData()
      setUser(user)
      setLoading(false)
    }
    fu()
  }, [])

  useEffect(() => {
    if (user) {
      const fi = async () => {
        const shopList = await fetchCartItems(user.uid)
        setCartItems(shopList)
      }
      fi()
    } else {
      setCartItems([])
    }
  }, [user])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <p>Please log in to view cart items.</p>
  }

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem.item} />
        ))
      ) : (
        <p>No cart items found.</p>
      )}
    </div>
  )
}

export default CartItems