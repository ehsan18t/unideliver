'use client'
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import Navbar from '@/components/nav/Navbar'
import { NavItem } from '@/components/nav/NavItem'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import SignIn from '@/components/signin/SignIn'

export const metadata = {
  title: 'Home Page',
  description: 'This is the home page',
}

export default function RootLayout({ children }) {
  const { user } = useAuth()
  return (
    <html lang="en">
      <body>
        <Navbar>
          <SignIn />
          <NavItem to="/" name="Home" icon={AiOutlineHome} />
          <NavItem to="#" name="Shop" icon={AiOutlineShop} />
          {user && user.isAdmin && (
            <NavItem to="/admin" name="Admin Panel" icon={RiAdminLine} />
          )}
        </Navbar>
        {children}
      </body>
    </html>
  )
}
