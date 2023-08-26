'use client'

import React, { useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useUpdate } from '@/hooks'

const CartItem = ({ cartItem, onDelete, className }) => {
  const { updateLoading, updateError, updateItem } = useUpdate()
  const [updatedData, setUpdatedData] = useState(cartItem)

  const handleUpdateItem = async (tableName, itemId) => {
    if (updateItem.quantity < 0) onDelete(cartItem)
    await updateItem(tableName, itemId, updatedData)
  }

  const item = cartItem.item
  if (!item) {
    return null // If item is null, don't render anything
  }

  const handleDeleteClick = () => {
    onDelete(cartItem)
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={item.pictureURL}
            alt={item.name}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold">{item.itemName}</p>
            <p className="text-red-500">
              {item.price * item.quantity} + {item.deliveryCharge}
            </p>

            <div className="flex gap-2">
              <button
                className="bg-gray-200 rounded-lg px-2 py-1 hover:bg-slate-300"
                onClick={() => {
                  updatedData.item.quantity = updatedData.item.quantity - 1
                  setUpdatedData(updatedData)
                  handleUpdateItem('cart', updatedData.id)
                }}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => {
                  updatedData.item.quantity = updatedData.item.quantity + 1
                  setUpdatedData(updatedData)
                  handleUpdateItem('cart', updatedData.id)
                }}
                className="bg-gray-200 rounded-lg px-2 py-1 hover:bg-slate-300"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="w-16 h-full flex justify-center items-center">
          <RiDeleteBin5Line
            className="shop-item-del-button"
            onClick={() => handleDeleteClick(item)}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
