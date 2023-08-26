'use client'

import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuth } from '@/hooks/useAuth'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiShoppingCart } from 'react-icons/ti'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Item = ({ item, onDelete }) => {
  const { user } = useAuth()
  const handleDeleteClick = () => {
    onDelete(item.id)
  }

  const addToCartHandler = async (item, userId) => {
    // Create a reference to the "cart" collection
    const cartRef = collection(db, 'cart')

    // Check if the item is already in the cart for the current user
    const cartQuery = query(
      cartRef,
      where('item.id', '==', item.id),
      where('uid', '==', userId),
    )
    const cartSnapshot = await getDocs(cartQuery)
    const cartItems = cartSnapshot.docs.map((doc) => doc.data())

    if (cartItems.length > 0) {
      // Item is already in the cart
      toast.error('Item already in the cart!', {
        position: 'bottom-right',
        autoClose: 2000,
      })
      return
    }

    // Data to be added to the cart document
    item.quantity = 1
    const cartData = {
      item: item,
      uid: userId,
    }

    try {
      const docRef = await addDoc(cartRef, cartData)
      console.log('Document added to cart:', docRef.id)
      toast.success('Item added to cart!', {
        position: 'bottom-right',
        autoClose: 2000,
      })
      // Optionally, you can perform any other actions after successfully adding the document to the cart
    } catch (error) {
      console.error('Error adding document to cart:', error)
      toast.error('Failed to add item!', {
        position: 'bottom-right',
        autoClose: 2000,
      })
    }
  }

  return (
    <div
      key={item.id}
      className="flex h-full bg-white flex-col gap-3 shadow rounded-lg"
    >
      <img
        className="h-64 md:h-72 w-full object-cover rounded-t-lg"
        src={item.pictureURL}
        alt={item.itemName}
      />
      <h2 className="pl-3 text-xl font-bold tracking-tight">{item.itemName}</h2>
      <div className="p-5 flex-grow flex flex-col gap-2 justify-between">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.description}
        </p>
        {user && user.isAdmin && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-red-500 font-semibold dark:text-gray-200">
              {item.price} + {item.deliveryCharge} TK
            </p>
            <div className="flex gap-3">
              <button
                className="shop-item-del-button"
                onClick={handleDeleteClick}
              >
                <RiDeleteBin5Line />
              </button>

              <button
                className="text-4xl text-teal-700 rounded-full p-2 transition duration-200 ease-in-out hover:text-white hover:bg-gray-600"
                onClick={() => addToCartHandler(item, user.uid)}
              >
                <TiShoppingCart />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Item
