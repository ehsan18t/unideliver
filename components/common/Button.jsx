import React from 'react'

const Button = ({ color = 'blue', onClick, className, children }) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    green: 'bg-green-600 hover:bg-green-700 text-white',
  }

  return (
    <button
      className={`${colorClasses[color]} px-4 py-2 rounded focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
