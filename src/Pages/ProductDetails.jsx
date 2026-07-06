import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificProduct } from "../APIs/products_ApIs";
import { queryClient } from "../main";
import toast from "react-hot-toast";
import { addToCart } from "../APIs/cart_APIs";
import { BiHeart } from "react-icons/bi";
import Loading from "../Components/Loading";
import { addToWishlist, getWishlist, removeFromWishlist } from "../APIs/wishlist";
import { UserContext } from "../context/UserContext";
import useCheckLogin from "../hooks/useCheckLogin";
import { HiHeart } from "react-icons/hi";

export default function ProductDetails() {
    const { productId } = useParams();
    const checkLogin = useCheckLogin()
    const [showAllReviews, setShowAllReviews] = useState(false);

    const { userToken } = useContext(UserContext)

    const { data, isLoading } = useQuery({
        queryKey: ["specificProduct", productId],
        queryFn: () => getSpecificProduct(productId),
    });
    const product = data?.data?.data;

    const { mutate: addToCartMutation } = useMutation({
        mutationFn: (productData) => {
            if (!userToken) {
                throw new Error('please login first')
            }

            return addToCart(productData)
        },

        onSuccess: (data) => {
            toast.success('Added to Cart Successfully')
            console.log(data)

            queryClient.invalidateQueries({
                queryKey: ['cartProducts']
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { data: wishListData, isLoading: wishlistIsLoading } = useQuery({
        queryKey: ["wishlistProducts"],
        queryFn: getWishlist,
        enabled: !!userToken
    });
    const wishlistProducts = wishListData?.data?.data || [];

    const wishlistIds = new Set(
        wishlistProducts.map((item) => item._id) || []
    );

    const isInWishlist = wishlistIds?.has(product?._id);

    const { mutate: addToWishlistMutation } = useMutation({
        mutationFn: (productData) => {
            return addToWishlist(productData)
        },

        onSuccess: (data) => {
            console.log(data)
            // toast.success("Added to Wishlist Successfully");
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
            queryClient.invalidateQueries({
                queryKey: ['wishlistProducts'],
            });
            console.log(data)
            // toast.success(`Removed from Wishlist Successfully`)
        }
    });

    const handleRemoveFromWishlist = (productData) => {
        if (!checkLogin()) return;

        removeFromWishlistMutation(productData)
        console.log(productData)
    }


    console.log("wishlistProducts", wishlistProducts);
    console.log("productId", product?._id);
    console.log("isInWishlist", isInWishlist);
    console.log(wishListData?.data.data);




    return (
        <>
            {isLoading ? <Loading /> : <div className="container mx-auto px-4 py-20">
                {/* Product Section */}
                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                    {/* Images */}
                    <div>
                        <div className="bg-gray-50 rounded-3xl p-6">
                            <img
                                src={product?.imageCover}
                                alt={product?.title}
                                className="w-full h-[500px] object-contain"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-3 mt-4">
                            {product?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={product?.title}
                                    className="w-full h-24 object-cover rounded-xl border border-gray-100 cursor-pointer hover:scale-105 transition"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                                {product?.category?.name}
                            </span>

                            <h1 className="text-4xl font-bold mt-5 text-slate-800">
                                {product?.title}
                            </h1>

                            <p className="text-gray-500 mt-3">
                                Brand :
                                <span className="font-semibold text-slate-700 ms-2">
                                    {product?.brand?.name}
                                </span>
                            </p>

                            <div className="flex items-center gap-3 mt-5">
                                <div className="bg-amber-50 px-3 py-1 rounded-full">
                                    ⭐ {product?.ratingsAverage}
                                </div>

                                <span className="text-gray-400">
                                    ({product?.ratingsQuantity} Reviews)
                                </span>
                            </div>

                            <h2 className="text-4xl font-bold text-emerald-600 mt-8">
                                {product?.price} EGP
                            </h2>

                            <div className="mt-8">
                                <h3 className="font-bold text-xl mb-3">
                                    Description
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {product?.description}
                                </p>
                            </div>

                            <div className="flex gap-10 mt-8">
                                <div>
                                    <span className="text-gray-400 text-sm">
                                        Quantity
                                    </span>

                                    <p className="font-bold text-lg">
                                        {product?.quantity}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-gray-400 text-sm">
                                        Sold
                                    </span>

                                    <p className="font-bold text-lg">
                                        {product?.sold}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-10">
                            <button
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-[1.02] text-white font-semibold py-3 rounded-xl transition"
                                onClick={() =>
                                    addToCartMutation({
                                        productId: product._id,
                                    })
                                }
                            >
                                Add To Cart
                            </button>

                            {isInWishlist ? (
                                <button
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    className="p-3 border border-red-200 rounded-xl hover:bg-red-50 transition"
                                >
                                    <HiHeart className="text-2xl text-red-500" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddToWishlist({ productId: product._id })}
                                    className="p-3 border border-red-200 rounded-xl hover:bg-red-50 transition"
                                >
                                    <BiHeart className="text-2xl text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-10 bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Customer Reviews
                        </h2>

                        <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-semibold">
                            {product?.ratingsQuantity} Reviews
                        </span>
                    </div>

                    {product?.reviews?.length ? (
                        <>
                            <div className="space-y-5">
                                {(showAllReviews
                                    ? product.reviews
                                    : product.reviews.slice(0, 3)
                                ).map((review) => (
                                    <div
                                        key={review._id}
                                        className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-slate-800">
                                                    {review?.user?.name}
                                                </h3>

                                                <span className="text-sm text-gray-400">
                                                    {new Date(review?.createdAt).toLocaleDateString("en-GB", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            <div className="bg-amber-50 px-3 py-1 rounded-full text-amber-600 font-semibold">
                                                ⭐ {review?.rating}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mt-4 leading-relaxed">
                                            {review?.review}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {product?.reviews?.length > 3 && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() =>
                                            setShowAllReviews(!showAllReviews)
                                        }
                                        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
                                    >
                                        {showAllReviews
                                            ? "Show Less Reviews"
                                            : `Show All Reviews (${product.reviews.length})`}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No Reviews Yet
                        </div>
                    )}
                </div>
            </div>}
        </>
    );
}