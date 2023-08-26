import React from 'react'

const Order = ({ order }) => {
  return (
    <div>
      <h2>Order</h2>
      <p>Order ID: {order.id}</p>
      <p>Order Status: {order.status}</p>
      <p>Order Total: {order.total}</p>
      <p>Order Date: {order.date}</p>
    </div>
  )
}

export default Order
