import { RiDeleteBin5Line } from 'react-icons/ri'
import Link from 'next/link'
import './shop-item.css'

const ShopItem = ({ shop, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(shop.id)
  }

  return (
    <li key={shop.id}>
      <div className="shop">
        <div className="shop-img">
          <Link href={`/shop/${shop.id}`}>
            <img src={shop.pictureURL} alt={shop.shopName} />
          </Link>
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
