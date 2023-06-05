import React, { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/config/firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddShopForm = ({ onClose }) => {
  const [shopName, setShopName] = useState('')
  const [location, setLocation] = useState('')
  const [picture, setPicture] = useState(null)

  const handleAddShop = async () => {
    try {
      if (shopName === '' || location === '' || picture === null) {
        toast.error('Please fill in all the required fields.', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        })
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
        onClose() // Close the modal
      }

      reader.readAsDataURL(picture)
    } catch (error) {
      console.error('Error adding shop:', error)
    }
  }

  const handlePictureUpload = (event) => {
    const file = event.target.files[0]
    setPicture(file)
  }

  return (
    <div>
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
    </div>
  )
}

export default AddShopForm
