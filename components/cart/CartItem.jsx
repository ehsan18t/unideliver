import { RiDeleteBin5Line } from 'react-icons/ri'

const CartItem = ({ cartItem, onDelete }) => {
  const item = cartItem.item
  if (!item) {
    return null // If item is null, don't render anything
  }

  const handleDeleteClick = () => {
    onDelete(cartItem)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={item.pictureURL}
            alt={item.name}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold">{item.itemName}</p>
            <p className="text-gray-500">
              {item.price} + {item.deliveryCharge}
            </p>

            <div className="flex gap-2">
              <button className="bg-gray-200 rounded-lg px-2 py-1">-</button>
              <p>1</p>
              <button className="bg-gray-200 rounded-lg px-2 py-1">+</button>
            </div>
          </div>
        </div>
        <RiDeleteBin5Line
          className="shop-item-del-button"
          onClick={() => handleDeleteClick(item)}
        />
      </div>
    </div>
  )
}

export default CartItem
