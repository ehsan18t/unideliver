'use client'
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import Navbar from '@/components/nav/Navbar'
import { NavItem } from '@/components/nav/NavItem'
import '@/styles/globals.css'
import { useAuth } from '@/hooks/useAuth'
import SignIn from '@/components/signin/SignIn'
import { ToastContainer } from 'react-toastify'
import { BsBagCheck } from 'react-icons/bs'

export default function RootLayout({ children }) {
  const { user } = useAuth()
  return (
    <html lang="en">
      <body>
        <Navbar>
          <SignIn />
          <NavItem to="/" name="Home" icon={AiOutlineHome} />
          <NavItem to="#" name="Shop" icon={AiOutlineShop} />
          {user && <NavItem to="/orders" name="My Orders" icon={BsBagCheck} />}
          {user && user.isAdmin && (
            <NavItem to="/admin/users" name="User Control" icon={RiAdminLine} />
          )}
        </Navbar>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
