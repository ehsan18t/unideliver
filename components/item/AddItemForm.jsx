import React, { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/config/firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddItemForm = ({ onClose, shopId }) => {
  const [itemName, setItemName] = useState('')
  const [description, setLocation] = useState('')
  const [price, setPrice] = useState(0.0)
  const [deliveryCharge, setDeliveryCharge] = useState(0.0)
  const [picture, setPicture] = useState(null)

  const handleAddItem = async () => {
    try {
      if (itemName === '' || description === '' || picture === null) {
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
        const storageRef = ref(storage, `itemPictures/${picture.name}`)
        await uploadBytes(storageRef, picture)

        // Get the download URL of the uploaded picture
        const pictureURL = await getDownloadURL(storageRef)

        // Add the item to the 'items' collection in Firestore
        await addDoc(collection(db, 'items'), {
          itemName,
          description,
          price,
          deliveryCharge,
          pictureURL,
          shopId,
        })

        setItemName('')
        setLocation('')
        setPicture(null)
        onClose() // Close the modal
      }

      reader.readAsDataURL(picture)
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handlePictureUpload = (event) => {
    const file = event.target.files[0]
    setPicture(file)
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Add Item</h3>
      <div className="modal-content">
        <label htmlFor="itemName" className="block mb-2">
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2"
        />

        <label htmlFor="description" className="block mb-2">
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2"
        />

        <label htmlFor="price" className="block mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2"
        />

        <label htmlFor="deliveryCharge" className="block mb-2">
          Delivery Charge:
        </label>
        <input
          type="number"
          id="deliveryCharge"
          value={price}
          onChange={(e) => setDeliveryCharge(e.target.value)}
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
          className="add-item-button bg-blue-500 text-white rounded px-4 py-2"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
    </div>
  )
}

export default AddItemForm
