'use client'
import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { BsCart4 } from 'react-icons/bs'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import CartPane from '@/components/cart/CartPane'

const Navbar = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const { user, loading } = useAuth()
  const hamburgerButtonRef = useRef(null)

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      if (
        hamburgerButtonRef.current &&
        hamburgerButtonRef.current.contains(e.target)
      ) {
        setSidebarOpen(!isSidebarOpen)
      } else {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('click', handleSidebarToggle)

    return () => {
      document.removeEventListener('click', handleSidebarToggle)
    }
  }, [isSidebarOpen])

  return (
    <nav className="bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600 font-semibold text-3xl font-sans">
          <img src="./logo.png" className="w-12 h-12" alt="" />
          <Link href="/">UniDeliver</Link>
        </div>
        <div className="flex gap-3 items-center">
          {user && <CartPane />}
          <button
            ref={hamburgerButtonRef}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 block"
            aria-label="Toggle sidebar"
          >
            {!loading && user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            ) : (
              <HiMenu className="w-10 h-10" />
            )}
          </button>
        </div>
        <div
          className={`shadow-md fixed top-0 left-0 h-full w-64 bg-white text-gray-800 transform transition-transform ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
