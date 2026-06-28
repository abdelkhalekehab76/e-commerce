import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getSpecificCategories } from '../APIs/products_ApIs'
import ProductCard from '../Components/ProductCard'
import Loading from '../Components/Loading'
import { getWishlist } from '../APIs/wishlist'
import { UserContext } from '../context/UserContext'

export default function CategoryDetails() {
    const { categoryId } = useParams()
    const { userToken } = useContext(UserContext)
    console.log(categoryId)

    const { data: categoryDAta, isLoading: categoryIsLoading } = useQuery({
        queryKey: ['specificCategory', categoryId],
        queryFn: () => getSpecificCategories(categoryId)
    })

    const { data: products, isLoading: isProductsLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    console.log(categoryDAta?.data.data)
    const category = categoryDAta?.data.data
    console.log(categoryDAta?.data.data._id)

    const filteredProducts = products?.data?.data?.filter((product) => product?.category?._id == categoryId)


    const { data: wishListData, isLoading: wishlistIsLoading } = useQuery({
        queryKey: ["wishlistProducts"],
        queryFn: getWishlist,
        enabled: !!userToken
    });
    const wishlistProducts = wishListData?.data?.data || [];

    const wishlistIds = new Set(
        wishlistProducts.map((item) => item._id) || []
    );



    return (
        <>
            <section className="container mx-auto px-4 py-10">

                {/* Category Hero */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl overflow-hidden shadow-xl">
                    {category && <div className="grid md:grid-cols-2 items-center">

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                Product Category
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mt-5">
                                {category.name}
                            </h1>

                            <p className="text-white/80 mt-4 text-lg">
                                Browse all products available in the{" "}
                                <span className="font-semibold">{category.name}</span> category.
                            </p>

                            <div className="mt-6">
                                <span className="bg-white text-green-600 px-5 py-2 rounded-full font-medium">
                                    {category.slug}
                                </span>
                            </div>
                        </div>

                    </div>}
                </div>

                {/* Products Section */}
                <div className="mt-16">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <h2 className="text-4xl font-bold text-slate-800">
                            {category?.name} Products
                        </h2>

                        <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"></div>
                    </div>

                    {/* Products Grid */}
                    {isProductsLoading ? (
                        // Loading State
                        <Loading />
                    ) : (
                        // Products Grid
                        <>
                            {filteredProducts?.length === 0 ? (
                                <div className="text-center text-gray-500 my-12">
                                    <p className="text-lg font-medium">
                                        No products found
                                    </p>
                                </div>
                            ) : (
                                // نقوم بعمل map على الـ filteredProducts وليس الـ data مباشرة
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredProducts?.map((product) => (
                                        <ProductCard key={product.id} product={product} wishlistIds={wishlistIds} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

            </section>
        </>
    )
}
