'use client'
import React, { useState } from 'react'
import CartItem from '@/components/cart/CartItem'
import useItemDeletion from '@/hooks/useItemDeletion'
import { useFetchLive, useAddToFirebase } from '@/hooks'
import Button from '@/components/common/Button'
import { HiOutlineShoppingCart } from 'react-icons/hi'

const CartPane = ({ children, uid }) => {
  const { addLoading, addError, addToFirebase } = useAddToFirebase()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const { delLoading, error, deleteItem } = useItemDeletion()
  const { data, loading: isDataLoading } = useFetchLive('cart', 'uid', uid)
  const [subTotal, setSubTotal] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [location, setLocation] = useState('')

  const handleDeleteCartItem = async (item) => {
    deleteItem('cart', item.id)
  }

  const handlePlaceOrder = async () => {
    const dataToAdd = {
      uid: uid,
      items: data,
      total: subTotal,
      deliveryCharge: deliveryCharge,
      location: location,
      status: 1,
      date: new Date().toISOString(),
    }

    await addToFirebase('orders', dataToAdd)

    setIsContinue(false)
    data.forEach((item) => {
      deleteItem('cart', item.id)
    })
  }

  const handleContinue = () => {
    let total = 0
    let delivery = 0
    setIsContinue(true)
    data.forEach((item) => {
      total += Number(item.item.price) * Number(item.item.quantity)
      delivery += Number(item.item.deliveryCharge)
    })
    setSubTotal(total + delivery)
    setDeliveryCharge(delivery)
  }

  return (
    <section id="cart">
      <div className="flex gap-3 items-center">
        <HiOutlineShoppingCart
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-orange-700 w-10 h-10 hover:text-slate-600 cursor-pointer"
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
            {!isContinue ? (
              <div className="flex-grow">
                {data.length > 0 ? (
                  data.map((cartItem) => (
                    <CartItem
                      className="border-b-[1px] pb-2 mb-1"
                      key={cartItem.id}
                      cartItem={cartItem}
                      onDelete={() => handleDeleteCartItem(cartItem)}
                    />
                  ))
                ) : (
                  <p className="flex justify-center">No cart items found.</p>
                )}
              </div>
            ) : (
              <div className="flex-grow">
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="location"
                  placeholder="Enter delivery location"
                  className="w-full mb-6 rounded-md border-[1px] border-gray-400/80"
                />
                <div className="flex flex-col gap-2">
                  {data.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="flex justify-between items-center border-b-[1px] py-2"
                    >
                      {cartItem.item.itemName}
                      <span className="w-full text-red-400 text-right">
                        {cartItem.item.quantity} x {cartItem.item.price} =
                        {cartItem.item.price * cartItem.item.quantity} + (
                        {cartItem.item.deliveryCharge})
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t-[1px] pt-2 w-full text-right">
                  = {subTotal} TK
                </div>
              </div>
            )}
            {!isContinue && data.length > 0 && (
              <Button
                onClick={handleContinue}
                className={'mb-36'}
                color="green"
              >
                Continue
              </Button>
            )}
            {isContinue && (
              <div className="flex gap-3 w-full">
                <Button
                  onClick={isContinue ? handlePlaceOrder : handleContinue}
                  className={'mb-36 w-full'}
                  color="green"
                >
                  {isContinue ? 'Place Order' : 'Continue'}
                </Button>
                <Button
                  onClick={() => setIsContinue(false)}
                  className={'mb-36 w-full'}
                  color="red"
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPane
