'use client'

import './shop-list.css'
import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'
import Modal from '@/components/modal/Modal'
import ShopItem from './ShopItem'
import AddShopForm from './AddShopForm'
import { useAuth } from '@/hooks/useAuth'
import useItemDeletion from '@/hooks/useItemDeletion'
import Button from '@/components/common/Button'

const ShopList = () => {
  const { user } = useAuth()
  const [shops, setShops] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const { loading, error, deleteItem } = useItemDeletion()

  useEffect(() => {
    const shopsCollection = collection(db, 'shops')
    const unsubscribe = onSnapshot(shopsCollection, (snapshot) => {
      const shopList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setShops(shopList)
    })

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe()
    }
  }, [])

  const handleDeleteShop = async (shop) => {
    deleteItem('shops', shop.id, shop.pictureURL)
  }

  return (
    <div className="shop-list mt-4">
      {user && user.isAdmin && (
        <Button onClick={() => setModalOpen(true)}>Add Shop</Button>
      )}

      <ul className="my-grid">
        {shops.map((shop) => (
          <ShopItem
            key={shop.id}
            shop={shop}
            onDelete={() => handleDeleteShop(shop)}
          />
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddShopForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default ShopList
