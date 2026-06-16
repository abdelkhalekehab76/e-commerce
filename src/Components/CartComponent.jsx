import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartComponent({ product }) {
  const { addProductToCart,deleteProductFromCart } = useContext(CartContext)
  return (
    <>
      <div
        key={product._id}
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
      >
        {/* Product Image */}
        <div className="relative pt-[100%] bg-gray-50 overflow-hidden group">
          <img
            src={product.imageCover}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
            {product.category?.name}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
              {product.brand?.name}
            </span>
            <h3 className="text-gray-800 font-medium text-sm mt-1 line-clamp-2 h-10">
              {product.title}
            </h3>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                {product.price} EGP
              </span>

              <div className="flex items-center text-sm font-medium text-amber-500">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.ratingsAverage}
              </div>
            </div>

            <button
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200"
              onClick={() => addProductToCart(product.id)}>
              Add to Cart
            </button>
            <button
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200"
              onClick={() => deleteProductFromCart(product.id)}>
              Delete From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
