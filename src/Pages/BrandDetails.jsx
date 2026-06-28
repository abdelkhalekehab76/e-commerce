import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProducts, getSpecificBrand } from "../APIs/products_ApIs";
import ProductCard from "../Components/ProductCard";
import Loading from "../Components/Loading";
import { getWishlist } from "../APIs/wishlist";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function BrandDetails() {
    const { brandId } = useParams();
    const { userToken } = useContext(UserContext)

    const { data: brandData, isLoading: brandIsLoading } = useQuery({
        queryKey: ["specificBrand", brandId],
        queryFn: () => getSpecificBrand(brandId),
    });

    const brand = brandData?.data?.data;
    const { data: products, isLoading: isProductsLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    console.log(brandData?.data.data)
    console.log(brandData?.data.data._id)

    const filteredProducts = products?.data?.data?.filter((product) => product?.brand?._id == brandId)
    console.log(filteredProducts)

    const { data: wishListData, isLoading: wishlistIsLoading } = useQuery({
        queryKey: ["wishlistProducts"],
        queryFn: getWishlist,
        enabled: !!userToken
    });
    const wishlistProducts = wishListData?.data?.data || [];

    const wishlistIds = new Set(
        wishlistProducts?.map((item) => item._id) || []
    );


    return (

        <>
            {
                brandIsLoading ? <div className="min-h-screen flex justify-center items-center">
                    <Loading />
                </div> : <section className="container mx-auto px-4 py-10">

                    {/* Brand Hero */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 md:p-12 shadow-xl">
                        <div className="flex flex-col md:flex-row items-center gap-8">

                            <div className="bg-white rounded-3xl p-6 shadow-lg">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>

                            <div className="text-center md:text-left">
                                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                    Premium Brand
                                </span>

                                <h1 className="text-5xl font-bold text-white mt-4">
                                    {brand.name}
                                </h1>

                                <p className="text-white/80 mt-3 text-lg">
                                    Discover all products from {brand.name}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="bg-white text-green-600 px-5 py-2 rounded-full font-medium">
                                        {brand.slug}
                                    </span>

                                    <span className="bg-white/20 text-white px-5 py-2 rounded-full">
                                        Brand Collection
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-4xl font-bold">
                                {brand.name} Products
                            </h2>

                            <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"></div>
                        </div>

                        {/* Products Grid */}

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

                    </div>

                </section>
            }
        </>
    );
}