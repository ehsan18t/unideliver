'use client'
import React, { useState, useRef, useEffect } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import CartItem from '@/components/cart/CartItem'
import useItemDeletion from '@/hooks/useItemDeletion'

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

const CartPane = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const hamburgerButtonRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const { delLoading, error, deleteItem } = useItemDeletion()

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

  const handleDeleteCartItem = async (item) => {
    deleteItem('cart', item.id)
  }

  return (
    <section id="cart">
      <div className="flex gap-3 items-center">
        <BsCart4
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          ref={hamburgerButtonRef}
          className="w-10 h-10"
        />
      </div>
      <div
        className={`shadow-md fixed top-20 right-0 h-full w-1/3 bg-white text-gray-800 transform transition-transform ease-in-out ${
          isSidebarOpen ? '-translate-x-100' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-center text-3xl font-semibold text-slate-600 text-center border-b-2 pb-3">
            Cart
          </div>
          <div className="mt-4">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  onDelete={() => handleDeleteCartItem(cartItem)}
                />
              ))
            ) : (
              <p className="flex justify-center">No cart items found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPane
