'use client'

import { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useParams } from 'next/navigation'
import ShopBanner from '@/components/shopList/ShopBanner'
import Loading from '@/components/common/Loading'
import AddItemForm from '@/components/item/AddItemForm'
import { useAuth } from '@/hooks/useAuth'
import useItemDeletion from '@/hooks/useItemDeletion'
import Modal from '@/components/modal/Modal'
import Item from '@/components/item/Item'
import useFilteredItems from '@/hooks/useFilteredItems'
import Button from '@/components/common/Button'

export default function ShopPage() {
  const params = useParams()
  const shopId = params.shopId
  const [shop, setShop] = useState(null)
  const items = useFilteredItems('items', 'shopId', shopId)
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()
  const { loading, error, deleteItem } = useItemDeletion()
  const [searchText, setSearchText] = useState('')
  const [itemList, setItemList] = useState()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'shops', shopId), (doc) => {
      setShop(doc.data())
    })
    return () => unsubscribe()
  }, [shopId])

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      return item.itemName.toLowerCase().includes(searchText.toLowerCase())
    })
    setItemList(filteredItems)
  }, [searchText, items])

  if (!shop) {
    return <Loading />
  }

  const handleDeleteItem = async (item) => {
    deleteItem('items', item.id, item.pictureURL)
  }

  return (
    <div>
      <ShopBanner shop={shop} />
      {user && user.isAdmin && (
        <Button
          className="mx-auto my-4 block transition ease-in-out duration-300 w-1/4 bg-blue-500 text-white rounded px-4 py-2"
          onClick={() => setModalOpen(true)}
        >
          Add Item
        </Button>
      )}
      <div className="flex w-full justify-center items-center py-4">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Items"
          className="border border-gray-300 rounded-md p-2 w-4/5"
        />
      </div>
      <div className="grid my-4 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6">
        {itemList &&
          itemList.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={() => handleDeleteItem(item)}
            />
          ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddItemForm onClose={() => setModalOpen(false)} shopId={shopId} />
      </Modal>
    </div>
  )
}
