import { RiDeleteBin5Line } from 'react-icons/ri'
import './shop-item.css'

const ShopItem = ({ shop, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(shop.id)
  }

  return (
    <li key={shop.id}>
      <div className="shop">
        <div className="shop-img">
          <img src={shop.pictureURL} alt={shop.shopName} />
        </div>
        <div className="shop-details">
          <h>{shop.shopName}</h>
          <p>{shop.location}</p>
        </div>
        <button onClick={handleDeleteClick}>
          <RiDeleteBin5Line />
        </button>
      </div>
    </li>
  )
}

export default ShopItem
