import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import ContactUs from './Pages/ContactUs'
import HomePage from './Pages/HomePage'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import ProductDetails from './Pages/ProductDetails'
import Categories from './Pages/Categories'
import CategoryDetails from './Pages/CategoryDetails'
import Brands from './Pages/Brands'
import BrandDetails from './Pages/BrandDetails'
import Wishlist from './Pages/Wishlist'
import Login from './Pages/Login'
import ProtectedRoute from './Layout/ProtectedRoute'
import AuthProtectedRoute from './Layout/AuthProtectedRoute'
import AllOrders from './Pages/AllOrders'
import NotFound from './Pages/NotFound'
import Register from './Pages/Register'

export default function App() {


  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <HomePage /> },
        { path: "products", element: <Products /> },
        { path: "products/:productId", element: <ProductDetails /> },
        { path: "categories", element: <Categories /> },
        { path: "categories/:categoryId", element: <CategoryDetails /> },
        { path: "brands", element: <Brands /> },
        { path: "brands/:brandId", element: <BrandDetails /> },
        { path: "contactUs", element: <ContactUs /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "wish-list", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "login", element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
        { path: "register", element: <AuthProtectedRoute><Register /></AuthProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
        { path: "*", element: <NotFound/> },
      ]
    },
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

