import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>

      <Navbar />
      <div className='container mx-auto'>
        <main className='mt-25'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
