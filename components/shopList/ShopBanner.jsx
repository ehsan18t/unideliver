const ShopBanner = ({ shop }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1/3 w-full flex gap-3 justify-start items-center">
      <img src={shop.pictureURL} className="h-72 w-96" alt="" />
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <p className="text-white text-6xl font-semibold">{shop.shopName}</p>
        <p className="text-gray-100 text-3xl">{shop.location}</p>
      </div>
    </div>
  )
}

export default ShopBanner
