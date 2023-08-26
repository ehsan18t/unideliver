'use client'

import { useAuth } from '@/hooks/useAuth'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Link from 'next/link'
import './shop-item.css'

const ShopItem = ({ shop, onDelete }) => {
  const { user } = useAuth()
  const handleDeleteClick = () => {
    onDelete(shop.id)
  }

  return (
    <div
      key={shop.id}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Link href={`/shop/${shop.id}`}>
        <img
          className="rounded-t-lg shadow-md"
          src={shop.pictureURL}
          alt={shop.shopName}
        />
      </Link>
      <div className="p-5">
        <Link href={`/shop/${shop.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {shop.shopName}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {shop.location}
        </p>
        {user && user.isAdmin && (
          <div className="flex">
            <button
              className="shop-item-del-button"
              onClick={handleDeleteClick}
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopItem
