import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import CartComponent from "../Components/CartComponent";

export default function Products() {
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const { data, error, isLoading } = useSWR(
        "https://ecommerce.routemisr.com/api/v1/products",
        fetcher,
    );

    console.log(data);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = data?.filter((product) => {
        const titleMatch = product.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        const brandMatch = product.brand?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        return titleMatch || brandMatch;
    });


    return (
        <>
            <div className="container mx-auto px-4 py-8" dir="ltr">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Latest Products
                </h1>
                <div className="mb-8 flex justify-end">
                    <div className="w-full md:w-1/3 relative">
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                            type="text"
                            placeholder="Search products or brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // تحديث الـ state عند الكتابة
                        />
                        {/* أيقونة البحث */}
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    // Loading State
                    <div className="flex justify-center items-center h-40">
                        <h2 className="text-xl font-semibold animate-pulse text-emerald-600">
                            Loading products...
                        </h2>
                    </div>
                ) : error ? (
                    // Error State
                    <div className="text-center text-red-500 font-semibold my-8">
                        <h2>Oops! Something went wrong while fetching data.</h2>
                    </div>
                ) : (
                    // Products Grid
                    <>
                        {/* رسالة تظهر في حال لم يطابق البحث أي منتج */}
                        {filteredProducts?.length === 0 ? (
                            <div className="text-center text-gray-500 my-12">
                                <p className="text-lg font-medium">
                                    No products found matching "{searchTerm}"
                                </p>
                            </div>
                        ) : (
                            // نقوم بعمل map على الـ filteredProducts وليس الـ data مباشرة
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts?.map((product) => (
                                    <CartComponent key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
