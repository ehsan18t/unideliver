'use client'
import React, { useState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import CartItem from '@/components/cart/CartItem'
import useItemDeletion from '@/hooks/useItemDeletion'
import { useFetchLive } from '@/hooks'
import Button from '@/components/common/Button'

const CartPane = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
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
          className="w-10 h-10"
        />
      </div>
      <div
        className={`shadow-md fixed top-20 right-0 h-full w-1/3 bg-white text-gray-800 transform transition-transform ease-in-out ${
          isSidebarOpen ? '-translate-y-100' : 'translate-y-full'
        }`}
      >
        <div className="p-4 h-full">
          <div className="flex justify-center text-3xl font-semibold text-slate-600 text-center border-b-2 pb-3">
            Cart
          </div>
          <div className="mt-4 h-full flex flex-col">
            <div className="flex-grow">
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
            {data.length > 0 && (
              <Button className={'mb-36'} color="green">
                Place Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPane
