'use client'
import React, { useState, useRef } from 'react'
import { BsCart4 } from 'react-icons/bs'
import CartItem from '@/components/cart/CartItem'
import useItemDeletion from '@/hooks/useItemDeletion'
import { useFetchLive } from '@/hooks'

const CartPane = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const hamburgerButtonRef = useRef(null)
  const { delLoading, error, deleteItem } = useItemDeletion()
  const { data, loading: isDataLoading } = useFetchLive('cart')

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
            {data.length > 0 ? (
              data.map((cartItem) => (
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
