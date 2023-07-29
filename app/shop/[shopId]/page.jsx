'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useParams } from 'next/navigation'
import ShopBanner from '@/components/shopList/ShopBanner'
import Loading from '@/components/common/Loading'
import AddItemForm from '@/components/item/AddItemForm'
import { useAuth } from '@/hooks/useAuth'
import Modal from '@/components/modal/Modal'

export default function ShopPage() {
  const params = useParams()
  const shopId = params.shopId
  const [shop, setShop] = useState(null)
  const [items, setItems] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'shops', shopId), (doc) => {
      setShop(doc.data())
    })
    return () => unsubscribe()
  }, [shopId])

  useEffect(() => {
    const itemsQuery = query(
      collection(db, 'items'),
      where('shopId', '==', shopId),
    )
    const unsubscribeItems = onSnapshot(itemsQuery, (snapshot) => {
      const itemList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(itemList)
    })

    return () => {
      unsubscribeItems()
    }
  }, [shopId])

  if (!shop) {
    return <Loading />
  }

  return (
    <div>
      <ShopBanner shop={shop} />
      {user && user.isAdmin && (
        <button onClick={() => setModalOpen(true)}>Add Item</button>
      )}
      <div>
        {items &&
          items.map((item) => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>

              <button>Add to cart</button>
            </div>
          ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddItemForm onClose={() => setModalOpen(false)} shopId={shopId} />
      </Modal>
    </div>
  )
}
