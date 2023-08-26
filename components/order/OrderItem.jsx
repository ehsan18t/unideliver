const OrderItem = ({ orderItem, className }) => {
  const item = orderItem.item
  if (!item) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <img
            src={item.pictureURL}
            alt={item.name}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold">{item.itemName}</p>
            <p className="text-red-500">
              {item.price * item.quantity} + {item.deliveryCharge} TK
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
