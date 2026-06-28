import React, { useContext, useState } from "react";
import { Spinner } from "@heroui/react";
import { addToCart } from '../APIs/cart_APIs';
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import { Link } from "react-router-dom";
import { BiHeart, BiLoader, BiTrash } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { addToWishlist, removeFromWishlist } from "../APIs/wishlist";
import { CgRemove } from "react-icons/cg";
import { UserContext } from "../context/UserContext";
import useCheckLogin from "../hooks/useCheckLogin";

export default function ProductCard({ product, wishlistIds }) {
  const [selectedProductId, setSelectedProductId] = useState(null)
  const checkLogin = useCheckLogin()
  const { mutate: addToCartMutation, isPending: isAddToCartPending } = useMutation({
    mutationFn: (productData) => {
      return addToCart(productData)
    },

    onSuccess: (data) => {
      toast.success('Added to Cart Successfully')
      console.log(data)

      queryClient.invalidateQueries({
        queryKey: ['cartProducts']
      })
      setSelectedProductId(null)
    },

    onError: (error) => {
      toast.error(error.message)
      setSelectedProductId(null)
    }

  })

  const handleAddToCart = (productData) => {
    if (!checkLogin()) return;

    addToCartMutation(productData)
  }



  const { mutate: addToWishlistMutation } = useMutation({
    mutationFn: (productData) => {
      return addToWishlist(productData)
    },

    onSuccess: () => {
      toast.success("Added to Wishlist Successfully");

      queryClient.invalidateQueries({
        queryKey: ["wishlistProducts"],
      });
    },

    onError: (error) => {
      toast.error(error.message)
    }
  });

  const handleAddToWishlist = (productData) => {
    if (!checkLogin()) return;

    addToWishlistMutation(productData)
  }



  const { mutate: removeFromWishlistMutation } = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: (data) => {
      console.log(data)
      toast.success(`Removed from Wishlist Successfully`, {
        icon: <BiTrash />
      })

      queryClient.invalidateQueries({
        queryKey: ['wishlistProducts']
      })
    }
  });

  const handleRemoveFromWishlist = (productData) => {
    if (!checkLogin()) return;

    removeFromWishlistMutation(productData)
  }


  const isInWishlist = wishlistIds?.has(product._id);

  return (
    <>
      {
        product && <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
          {/* Image */}
          <div className="relative overflow-hidden bg-slate-50">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-72 object-contain p-6 group-hover:scale-110 transition duration-500"
              />
            </Link>

            {/* Category */}
            <span className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              {product.category?.name}
            </span>

            {/* Wishlist */}
            {isInWishlist ? (
              <button className="absolute top-4 right-4 bg-white shadow-md rounded-full p-2 hover:scale-110 transition"
                onClick={() => handleRemoveFromWishlist(product._id)}
              >
                <HiHeart className="text-red-500 text-xl" />
              </button>
            ) : (
              <button
                onClick={() =>
                  handleAddToWishlist({ productId: product._id })
                }
                className="absolute top-4 right-4 bg-white shadow-md rounded-full p-2 hover:scale-110 transition"
              >
                <BiHeart className="text-gray-400 text-xl" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-green-600 font-medium text-sm">
              {product.brand?.name}
            </p>

            <h3 className="font-semibold text-slate-800 mt-2 line-clamp-2 min-h-[56px]">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <svg
                className="w-4 h-4 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

              <span className="font-medium text-slate-600">
                {product.ratingsAverage}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5">
              <span className="text-2xl font-bold text-slate-800">
                {product.price} EGP
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
                <span>Add</span>
                {isAddToCartPending && selectedProductId == product._id ? <BiLoader /> : null}
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
