import Nav from '@/components/nav/Nav'
import './globals.css'

export const metadata = {
  title: 'Home Page',
  description: 'This is the home page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
