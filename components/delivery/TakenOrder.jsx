'use client'
import React from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'
import Button from '@/components/common/Button'
import { useUpdate } from '@/hooks'
import { useAuth } from '@/hooks/useAuth'

const status = {
  3: 'On The Way',
  4: 'Delivered',
}

const TakenOrder = ({ order, className }) => {
  const { updateItem } = useUpdate()
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && !user) {
    return <div>Not Authorized</div>
  }

  return (
    <div className={cn('border-b-[1px] p-3', className)}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">
            {dayjs(order.date).format('DD-MMM-YYYY hh:mm A')}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>
            <span className="font-semibold">Location:</span> {order.location}
          </p>
          <p>Total Amount (TK): {order.total}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>
            <span className="font-semibold">Item Quantity:</span>{' '}
            {order.items.length}
          </p>
          {order.status === 4 ? (
            <p className="text-green-500 font-semibold">
              {status[order.status]}
            </p>
          ) : (
            <Button
              onClick={() => {
                updateItem('orders', order.id, {
                  ...order,
                  status: order.status + 1,
                })
              }}
            >
              {status[order.status + 1]}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TakenOrder
