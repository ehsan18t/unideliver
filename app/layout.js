import Nav from '@/components/nav/Nav'
import SignIn from '@/components/signin/SignIn'
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
        <SignIn />
        {children}
      </body>
    </html>
  )
}
