import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategories } from "../APIs/products_ApIs";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

export default function Categories() {



    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })



    const categories = categoriesData?.data?.data

    return (
        <section className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-10">
                Categories
            </h1>

            {categoriesLoading ? <Loading/> : <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories && categories.map((category) => (
                    <Link key={category._id} to={`/categories/${category._id}`}>
                        <div
                            key={category._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-4 text-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {category.name}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {category.slug}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>}


        </section>
    );
}