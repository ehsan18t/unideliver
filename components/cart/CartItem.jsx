import React from 'react'

const CartItem = ({ item }) => {
  if (!item) {
    return null // If item is null, don't render anything
  }

  const { itemName, id } = item
  return (
    <div>
      <h3>Item: {itemName}</h3>
      <p>ID: {id}</p>
    </div>
  )
}

export default CartItem
