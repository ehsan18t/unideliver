'use client'

import React, { useState, useEffect } from 'react'
import { useFetchAll } from '@/hooks'
import DeliveryOrder from '@/components/delivery/Order'

const Orders = () => {
  const { data: orders, loading } = useFetchAll('orders')
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    if (orders) {
      const filteredOrders = orders.filter((order) => order.status === 1)
      setOrderList(filteredOrders)
    }
  }, [orders])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="m-5 rounded-lg shadow-lg border-[1px] p-5">
      <h2 className="border-b-2 text-2xl p-5">All Orders</h2>
      {orderList.length > 0 ? (
        orderList.map((order) => <DeliveryOrder key={order.id} order={order} />)
      ) : (
        <p className="flex justify-center">No orders found.</p>
      )}
    </div>
  )
}

export default Orders
