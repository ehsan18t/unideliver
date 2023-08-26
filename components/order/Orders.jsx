'use client'

import React from 'react'
import { useUserOrders } from '@/hooks'
import Order from './Order'

const Orders = () => {
  const { orders, loading } = useUserOrders()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => <Order key={order.id} order={order} />)
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  )
}

export default Orders
