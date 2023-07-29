'use client'

import './shop-list.css'
import React, { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import Modal from '@/components/modal/Modal'
import ShopItem from './ShopItem'
import AddShopForm from './AddShopForm'
import { ToastContainer } from 'react-toastify'

const ShopList = () => {
  const [shops, setShops] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

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

  const handleDeleteShop = async (shopId) => {
    try {
      const shopRef = doc(collection(db, 'shops'), shopId)

      // Get the shop document to retrieve the picture URL
      const shopSnapshot = await getDoc(shopRef)
      const shopData = shopSnapshot.data()
      const pictureURL = shopData.pictureURL

      // Delete the shop document from Firestore
      await deleteDoc(shopRef)

      // Delete the image from Firebase storage
      const pictureRef = ref(storage, pictureURL)
      await deleteObject(pictureRef)
    } catch (error) {
      console.error('Error deleting shop:', error)
    }
  }

  return (
    <div className="shop-list">
      <button onClick={() => setModalOpen(true)}>Add Shop</button>

      <h2>Shop List</h2>

      <ul>
        {shops.map((shop) => (
          <ShopItem key={shop.id} shop={shop} onDelete={handleDeleteShop} />
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddShopForm onClose={() => setModalOpen(false)} />
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default ShopList
