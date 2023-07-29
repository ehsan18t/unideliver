'use client'

import { useEffect, useState } from 'react'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { usePathname } from 'next/navigation'

export default function ShopPage() {
  const shopId = usePathname().split('/')[3]
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopDocRef = doc(collection(db, 'shops'), shopId)
        const shopDocSnap = await getDoc(shopDocRef)

        if (shopDocSnap.exists()) {
          setShop({ id: shopDocSnap.id, ...shopDocSnap.data() })
        } else {
          console.log('Shop not found')
          // Redirect to a 404 page or handle accordingly
        }
      } catch (error) {
        console.error('Error fetching shop:', error)
        // Handle error
      } finally {
        setLoading(false)
      }
    }

    if (shopId) {
      fetchShop()
    }
  }, [shopId])

  if (loading) {
    // Handle loading state
    return null
  }

  if (!shop) {
    // Handle shop not found state
    return <p>Shop not found</p>
  }

  return (
    <div>
      <h2>{shop.shopName}</h2>
      <p>{shop.location}</p>
      <img src={shop.pictureURL} alt={shop.shopName} />
    </div>
  )
}
