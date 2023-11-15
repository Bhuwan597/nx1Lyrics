import AdminNavbar from '@/components/adminComponents/Navbar'
import React from 'react'
const layout = ({children}) => {
  return (
    <>
    <AdminNavbar/>
    {children}
    </>
  )
}
export const metadata = {
  title: 'nx1Lyrics  |  Search for songs lyrics ends here.',
  description: 'Ultimate place to find all the lyrics of popular songs.',
  keywords: 'lyrics',
}
export default layout