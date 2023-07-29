// hooks/useItemDeletion.js
import { useState } from 'react'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

const useItemDeletion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteItem = async (dbName, itemId, pictureURL) => {
    try {
      setLoading(true)

      // Delete the item document from Firestore
      const itemRef = doc(collection(db, dbName), itemId)
      await deleteDoc(itemRef)

      // If pictureURL is provided, delete the image from Firebase Storage
      if (pictureURL) {
        try {
          const pictureRef = ref(storage, pictureURL)
          await getDownloadURL(pictureRef) // Check if the image exists
          await deleteObject(pictureRef) // Delete the image
        } catch (error) {
          // If the image does not exist or there's an error, just log the error
          console.error('Error deleting image:', error)
        }
      }

      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { loading, error, deleteItem }
}

export default useItemDeletion
