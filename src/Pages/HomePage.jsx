import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../APIs/products_ApIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart } from "../APIs/cart_APIs";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import useCheckLogin from "../hooks/useCheckLogin";
import { BiLoader } from "react-icons/bi";

export default function Home() {
  const checkLogin = useCheckLogin()
  const [counter, setCounter] = useState(() => {
    return Number(localStorage.getItem("sliderIndex")) || 0;
  });

  const [selectedProductId, setSelectedProductId] = useState(null)


  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
  const products = productsData?.data.data



  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  const categories = categoriesData?.data?.data



  const { mutate: addToCartMutation, isPending: isAddToCartPending } = useMutation({
    mutationFn: (productsData)=>{
      return addToCart(productsData)
    },

    onSuccess: (data) => {
      toast.success('Added to Cart Successfully')
      console.log(data)

      queryClient.invalidateQueries({
        queryKey: ['cartProducts']
      })
    }

  })

  const handleAddToCart = (productData) => {
    if (!checkLogin()){
      return 
    }

    addToCartMutation(productData)

  }



  useEffect(() => {
    localStorage.setItem("sliderIndex", counter);
  }, [counter]);


  useEffect(() => {
    if (!products?.length) return;

    const interval = setInterval(() => {
      setCounter((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [products]);



  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-green-600 to-emerald-500 min-h-[80vh] flex items-center py-10 rounded-xl">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              New Collection 2026
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 leading-tight">
              Discover The Best Products
            </h1>

            <p className="text-white/80 mt-6 text-lg">
              Shop the latest trends with unbeatable prices and
              premium quality products.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to={'products'}>
                <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                  Shop Now
                </button></Link>

              <button className="border border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-green-600 transition">
                Explore
              </button>
            </div>
          </div>

          <div>
            <img
              src={`${products?.[counter]?.imageCover}`}
              alt=""
              className="rounded-3xl shadow-2xl w-full h-120 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Shop By Category
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories && categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-3xl p-8 shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer text-center"
              >
                <Link to={`/categories/${category._id}`}>

                  {/* <img className="h-40 w-full" src={category.image} alt="" /> */}
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products && products.slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl overflow-hidden shadow group"
              >
                <img
                  src={`${product.imageCover}`}
                  alt={`${product.title}`}
                  className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg">
                    {`${product.title}`}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {`${product.slug}`}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-green-600">
                      {`$${product.price}`}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedProductId(product._id)
                        handleAddToCart({ productId: product._id })
                      }
                      }
                      disabled={isAddToCartPending && selectedProductId == product._id}
                      className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition flex justify-center items-center space-x-2"
                    >
                      <span>Add to Cart</span>
                      {isAddToCartPending && selectedProductId == product._id ? <BiLoader /> : null}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <h3 className="font-bold text-xl">
                Free Shipping
              </h3>
              <p className="text-gray-500 mt-3">
                Free shipping on all orders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <h3 className="font-bold text-xl">
                Secure Payment
              </h3>
              <p className="text-gray-500 mt-3">
                100% secure transactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <h3 className="font-bold text-xl">
                24/7 Support
              </h3>
              <p className="text-gray-500 mt-3">
                Dedicated support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-600 py-20 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white">
            Subscribe To Our Newsletter
          </h2>

          <p className="text-white/80 mt-4">
            Get updates about new products and offers.
          </p>

          <div className="max-w-xl mx-auto mt-8 flex bg-white/50 p-10 rounded-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-l-xl outline-none bg-white"
            />

            <button className="bg-black text-white px-8 rounded-r-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}