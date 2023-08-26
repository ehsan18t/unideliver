'use client'

import React from 'react'
import { useItemById } from '@/hooks'
import { useParams } from 'next/navigation'
import OrderItem from '@/components/order/OrderItem'
import Ball from '@/components/common/Ball'
import Order from '@/components/order/Order'

const OrderViewPage = () => {
  const params = useParams()
  const orderId = params.orderId
  const { item, loading } = useItemById('orders', orderId)

  console.log('item', item)

  if (loading) return <div>Loading...</div>

  const ballOptions = [
    {
      status: 1,
      name: 'Pending',
      color: 'slate',
      text: 'Test',
    },
    {
      status: 2,
      name: 'Purchase Confirmed',
      color: 'blue',
      text: 'Test',
    },
    {
      status: 3,
      name: 'On Your Way',
      color: 'yellow',
      text: 'Test',
    },
    {
      status: 4,
      name: 'Delivered',
      color: 'green',
      text: 'Test',
    },
  ]

  ballOptions[item.status - 1].active = true
  console.log('ballOptions', ballOptions)

  return (
    <div className="p-10">
      <h1 className="flex justify-center text-center text-3xl pb-7 font-semibold">
        Order Status
      </h1>
      <div className="flex justify-around mb-4 border-[1px] p-5 rounded-3xl py-10">
        {ballOptions.map((ball, index) => {
          return (
            <Ball
              key={index}
              text={ball.name}
              color={ball.color}
              active={ball.active && true}
            />
          )
        })}
      </div>
      <Order order={item} />
      {item.items.map((item, index) => {
        return <OrderItem key={index} orderItem={item} />
      })}
    </div>
  )
}

export default OrderViewPage
