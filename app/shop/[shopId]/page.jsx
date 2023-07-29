'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useParams } from 'next/navigation'

export default function ShopPage() {
  const params = useParams()
  const shopId = params.shopId
  const [shop, setShop] = useState(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'shops', shopId), (doc) => {
      setShop(doc.data())
    })
    return () => unsubscribe()
  }, [shopId])

  if (!shop) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{shop.shopName}</h2>
      <p>{shop.location}</p>
      <img src={shop.pictureURL} alt={shop.shopName} />
    </div>
  )
}