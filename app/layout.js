import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai'
import Navbar from '@/components/nav/Navbar'
import { NavItem } from '@/components/nav/NavItem'
import './globals.css'

export const metadata = {
  title: 'Home Page',
  description: 'This is the home page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar>
          <NavItem to="#" name="Home" icon={AiOutlineHome} />
          <NavItem to="#" name="Shop" icon={AiOutlineShop} />
        </Navbar>
        {children}
      </body>
    </html>
  )
}
