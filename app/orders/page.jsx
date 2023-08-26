'use client'

import React from 'react'
import { useUserOrders } from '@/hooks'
import Order from '@/components/order/Order'

const Orders = () => {
  const { orders, loading } = useUserOrders()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="m-5 rounded-lg shadow-lg border-[1px] p-5">
      <h2 className="border-b-2 text-2xl p-5">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => <Order key={order.id} order={order} />)
      ) : (
        <p className="flex justify-center">No orders found.</p>
      )}
    </div>
  )
}

export default Orders
