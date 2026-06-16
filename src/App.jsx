import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import ContactUs from './Pages/ContactUs'
import HomePage from './Pages/HomePage'
import Products from './Pages/Products'

export default function App() {


  const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<HomePage/>},
      {path:"/products",element:<Products/>},
      {path:"/contactUs",element:<ContactUs/>}
    ]}
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

