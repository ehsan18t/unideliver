'use client'
import React, { useState } from 'react'

const Toggle = ({ onChange, value = false }) => {
  const [isActive, setIsActive] = useState(value)

  const toggle = () => {
    const state = !isActive
    setIsActive(state)
    if (onChange) onChange(state)
  }

  return (
    <button
      className={`relative inline-block w-14 h-8 transition-colors duration-300 ${
        isActive ? 'bg-blue-500' : 'bg-gray-300'
      } rounded-full`}
      onClick={toggle}
    >
      <span
        className={`absolute inset-y-0 left-0 w-8 h-8 transition-transform duration-300 transform ${
          isActive ? 'translate-x-full' : 'translate-x-0'
        } bg-white rounded-full shadow-md`}
      ></span>
    </button>
  )
}

export default Toggle
