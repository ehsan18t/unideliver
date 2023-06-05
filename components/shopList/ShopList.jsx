'use client'

import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import Modal from '@/components/modal/Modal'
import ShopItem from './ShopItem'

const ShopList = () => {
  const [shops, setShops] = useState([])
  const [shopName, setShopName] = useState('')
  const [location, setLocation] = useState('')
  const [picture, setPicture] = useState(null)
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

  const handleAddShop = async () => {
    try {
      if (shopName === '' || location === '' || picture === null) {
        alert('Please fill in all the required fields.')
        return
      }

      // Convert the picture to a data URL string
      const reader = new FileReader()
      reader.onload = async (event) => {
        const dataURL = event.target.result

        // Upload the picture to Firebase storage
        const storageRef = ref(storage, `shopPictures/${picture.name}`)
        await uploadBytes(storageRef, picture)

        // Get the download URL of the uploaded picture
        const pictureURL = await getDownloadURL(storageRef)

        // Add the shop to the 'shops' collection in Firestore
        await addDoc(collection(db, 'shops'), {
          shopName,
          location,
          pictureURL,
        })

        setShopName('')
        setLocation('')
        setPicture(null)
        setModalOpen(false)
      }

      reader.readAsDataURL(picture)
    } catch (error) {
      console.error('Error adding shop:', error)
    }
  }

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

  const handlePictureUpload = (event) => {
    const file = event.target.files[0]
    setPicture(file)
  }

  return (
    <div className="shop-page border-2">
      <button
        className="add-shop-button bg-blue-500 text-white rounded px-4 py-2 mb-4"
        onClick={() => setModalOpen(true)}
      >
        Add Shop
      </button>

      <h2 className="text-2xl font-bold mb-4">Shop List</h2>
      <ul>
        {shops.map((shop) => (
          <ShopItem key={shop.id} shop={shop} onDelete={handleDeleteShop} />
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Add Shop</h3>
        <div className="modal-content">
          <label htmlFor="shopName" className="block mb-2">
            Shop Name:
          </label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full px-2 py-1 border rounded mb-2"
          />

          <label htmlFor="location" className="block mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-2 py-1 border rounded mb-2"
          />

          <label htmlFor="picture" className="block mb-2">
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={handlePictureUpload}
            className="mb-2"
          />

          <button
            className="add-shop-button bg-blue-500 text-white rounded px-4 py-2"
            onClick={handleAddShop}
          >
            Add Shop
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ShopList
