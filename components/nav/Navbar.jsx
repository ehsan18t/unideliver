'use client'
import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

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
        <div className="flex items-center text-gray-600 font-semibold text-3xl font-sans">
          UniDeliver
        </div>
        <div className="flex items-center">
          <button
            ref={hamburgerButtonRef}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 block"
            aria-label="Toggle sidebar"
          >
            {!loading && user && user.photoURL ? (
              <Image
                width={40}
                height={40}
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
