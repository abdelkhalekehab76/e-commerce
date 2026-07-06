import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getWishlist, removeFromWishlist } from "../APIs/wishlist";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import Loading from "../Components/Loading";
import { addToCart } from "../APIs/cart_APIs";
import { UserContext } from "../context/UserContext";



export default function Wishlist() {
    const { userToken } = useContext(UserContext)
    const { data: wishListData, isLoading: wishlistIsLoading } = useQuery({
        queryKey: ["wishlistProducts"],
        queryFn: getWishlist,
        enabled: !!userToken
    });
    const wishlistProducts = wishListData?.data?.data || [];


    const { mutate: removeFromWishlistMutation, isPending: removePending } = useMutation({
        mutationFn: removeFromWishlist,

        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['wishlistProducts']
            })
            toast.success(`Removed from Wishlist Successfully`)

        }
    });

    const { mutate: addToCartMutation } = useMutation({
        mutationFn: addToCart,

        onSuccess: (data) => {
            toast.success('Added to Cart Successfully')
            console.log(data)

            queryClient.invalidateQueries({
                queryKey: ['cartProducts']
            })
        }

    })


    return (
        <div className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white mb-10">
                <h1 className="text-4xl font-bold">My Wishlist</h1>
                <p className="mt-2 text-white/80">
                    {wishlistProducts.length} Products Saved
                </p>
            </div>

            {wishlistIsLoading ? <Loading /> : wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-md p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-700">
                        Your Wishlist is Empty 💔
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start adding products you love.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block mt-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-5">
                    {wishlistProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col md:flex-row items-center gap-6"
                        >
                            {/* Image */}
                            <Link to={`/products/${product._id}`}>
                                <img
                                    src={product.imageCover}
                                    alt={product.title}
                                    className="w-36 h-36 object-contain"
                                />
                            </Link>

                            {/* Details */}
                            <div className="flex-1">
                                <span className="text-xs uppercase text-emerald-600 font-semibold">
                                    {product.brand?.name}
                                </span>

                                <h2 className="text-xl font-bold text-gray-800 mt-1">
                                    {product.title}
                                </h2>

                                <p className="text-gray-500 mt-2 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-2 mt-3">
                                    <span className="text-amber-500">
                                        ⭐ {product.ratingsAverage}
                                    </span>

                                    <span className="text-gray-400">
                                        ({product.ratingsQuantity} Reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-2xl font-bold text-emerald-600">
                                    {product.price} EGP
                                </span>

                                <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
                                    onClick={() => addToCartMutation({ productId: product._id })}
                                >
                                    Add To Cart
                                </button>

                                <button
                                    className="text-red-500 hover:text-red-700 transition"
                                    onClick={() => removeFromWishlistMutation(product._id)}
                                >
                                    <BsTrash className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}