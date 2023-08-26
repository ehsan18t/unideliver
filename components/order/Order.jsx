import React from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'

const status = {
  1: 'Pending',
  2: 'Confirmed',
  3: 'Delivered',
  4: 'Cancelled',
}

const Order = ({ order }) => {
  return (
    <div className="border-b-[1px] p-3">
      <Link href={`/orders/${order.id}`}>
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
            <p>{status[order.status]}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>
              <span className="font-semibold">Item Quantity:</span>{' '}
              {order.items.length}
            </p>
            <p>Total Amount (TK): {order.total}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Order