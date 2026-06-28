import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { clearCart, getCart, removeProductFomCart, updateProduct } from '../APIs/cart_APIs'
import toast from 'react-hot-toast'
import { queryClient } from '../main'
import { Spinner } from '@heroui/react'
import { BiLoader } from 'react-icons/bi'
import ProductCard from '../Components/ProductCard'
import Loading from '../Components/Loading'
import { UserContext } from '../context/UserContext'
import { Button, Modal } from "@heroui/react";

export default function Cart() {

    const [productId, setProductId] = useState()
    const { userToken } = useContext(UserContext)

    const { data: cartProductsData, isLoading, isError, error } = useQuery({
        queryKey: ['cartProducts'],
        queryFn: getCart,
        enabled: !!userToken
    })
    const products = cartProductsData?.data.data.products
    console.log(products)

    const { mutate: deleteProductFromCartMutation, isPending: deleteProductIsPending } = useMutation({
        mutationFn: removeProductFomCart,

        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['cartProducts'],
            })
            toast.success(`Removed from Wishlist Successfully`)
        },
    })


    const { mutate: updateProductMutation, isPending: updateProductIsPending } = useMutation({
        mutationFn: updateProduct,

        onSuccess: (data) => {
            console.log(data)
            toast.success('product successfully updated')

            queryClient.invalidateQueries({
                queryKey: ['cartProducts']
            })

            setProductId(null)
        },
        onError: () => {
            setProductId(null)
        }
    })

    const { mutate: clearCartMutation, isPending: clearCartISPending } = useMutation({
        mutationFn: clearCart,

        onSuccess: (data) => {
            console.log(data)
            toast.success("cart cleared")

            queryClient.invalidateQueries({
                queryKey: ['cartProducts']
            })
        }
    })

    return (
        <>
            <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans" dir="ltr">
                {/* Page Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span>Shopping Cart</span>
                    <span className="text-xl font-normal text-gray-500">({cartProductsData?.data.data.products.length} items)</span>
                </h1>

                {isLoading || clearCartISPending ? <Loading /> : isError ? <div className='min-h-screen flex items-center justify-center'>
                    <h2 className='text-2xl text-red-500'>{error.response?.data?.message}</h2>
                </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Side: Products List */}
                    <div className="lg:col-span-2 space-y-4">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <div key={product?._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm gap-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">

                                    {/* Product Info */}
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img
                                            src={product?.product?.imageCover}
                                            alt={product?.product?.title}
                                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border bg-gray-50 flex-shrink-0"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-gray-800 text-base md:text-lg line-clamp-1">
                                                {product?.product?.title || "Product Title"}
                                            </h3>
                                            <p className="text-xs text-gray-400">Brand: <span className="text-gray-600 font-medium">{product.product?.brand?.name}</span></p>
                                            <p className="text-xs text-gray-400">Category: <span className="text-gray-600 font-medium">{product.product?.category?.name}</span></p>
                                            <p className="text-emerald-600 font-bold text-base pt-1">{product?.price} EGP</p>
                                        </div>
                                    </div>

                                    {/* Actions: Quantity & Remove */}
                                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                                        {/* Quantity Counter */}
                                        <div className={`flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-sm relative z-10`}>

                                            {updateProductIsPending && productId == product.product._id ? <div className="loader absolute inset-0 cursor-not-allowed bg-amber-400/80 flex justify-center items-center z-50">
                                                <BiLoader />
                                            </div> : null}

                                            <button
                                                className="px-3 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 font-bold transition"
                                                onClick={() => {
                                                    if (product.count > 1) {
                                                        setProductId(product.product._id);
                                                        updateProductMutation({
                                                            productId: product.product._id,
                                                            count: product.count - 1,
                                                        });
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 font-semibold text-gray-800 min-w-8 text-center">
                                                {product?.count}
                                            </span>
                                            <button
                                                className="px-3 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 font-bold transition"
                                                onClick={() => {
                                                    setProductId(product.product._id);
                                                    updateProductMutation({
                                                        productId: product.product._id,
                                                        count: product.count + 1,
                                                    })
                                                }
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}

                                        <button
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition duration-200 relative"
                                            onClick={() => { deleteProductFromCartMutation(product.product._id); setProductId(product.product._id) }}
                                            disabled={deleteProductIsPending && productId == product.product._id}
                                        >
                                            {
                                                deleteProductIsPending && productId == product.product._id ? <BiLoader /> :
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span className="hidden md:inline">Remove</span>

                                                    </>
                                            }
                                        </button>

                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center p-16 bg-white rounded-xl shadow-sm">
                                <p className="text-gray-400 text-xl">Your cart is empty 🛒</p>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-50 sticky top-20">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-semibold text-gray-800">{cartProductsData?.data.data?.totalCartPrice} EGP</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium text-emerald-600">Free</span>
                            </div>
                            <hr className="border-gray-100 my-2" />
                            <div className="flex justify-between">
                                <span className="text-gray-800 font-semibold text-base">Total Amount</span>
                                <div>
                                    <p className="text-xl font-black text-emerald-600">{(cartProductsData?.data.data?.totalCartPrice) - (cartProductsData?.data.data?.totalCartPrice) * (10 / 100)} EGP</p>
                                    <span className="text-xl text-gray-400 line-through">{cartProductsData?.data.data?.totalCartPrice} EGP</span>
                                </div>
                            </div>
                        </div>

                        <Modal>
                            <Button className="w-full bg-emerald-600 text-white py-6 rounded-xl font-semibold hover:bg-emerald-700 transition duration-200 shadow-sm hover:shadow-md mb-3">
                                Proceed to Checkout
                            </Button>
                            <Modal.Backdrop>
                                <Modal.Container>
                                    <Modal.Dialog className="sm:max-w-[360px]">
                                        <Modal.CloseTrigger />
                                        <Modal.Header>
                                            <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>
                                                A beautiful, fast, and modern React UI library for building accessible and
                                                customizable web applications with ease.
                                            </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button className="w-full" slot="close">
                                                Continue
                                            </Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                                </Modal.Container>
                            </Modal.Backdrop>
                        </Modal>
                        <button
                            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition duration-200 shadow-sm hover:shadow-md"
                            onClick={() => clearCartMutation()}
                        >
                            {clearCartISPending ? <BiLoader /> : null}
                            Clear Cart
                        </button>
                    </div>

                </div>
                }
            </div>







        </>
    )
}
