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
import { RiDeleteBin5Line } from 'react-icons/ri'
import Modal from '@/components/modal/Modal'

const Shop = () => {
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
    <div className="shop-page">
      <h2>Shop List</h2>

      <button className="add-shop-button" onClick={() => setModalOpen(true)}>
        Add Shop
      </button>

      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <div className="shop-info">
              <div className="shop-image">
                <img src={shop.pictureURL} alt={shop.shopName} />
              </div>
              <div className="shop-details">
                <h3>{shop.shopName}</h3>
                <p>{shop.location}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteShop(shop.id)}
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3>Add Shop</h3>
        <div className="modal-content">
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label htmlFor="picture">Picture:</label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={handlePictureUpload}
          />

          <button className="add-shop-button" onClick={handleAddShop}>
            Add Shop
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Shop
