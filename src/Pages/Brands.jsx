import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../APIs/products_ApIs";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

export default function Brands() {
    const { data: brandsData, isLoading: brandsIsLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    const brands = brandsData?.data?.data;

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-green-600 font-semibold uppercase tracking-widest">
                        Trusted Partners
                    </span>

                    <h1 className="text-5xl font-bold text-slate-800 mt-3">
                        Our Brands
                    </h1>

                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Explore products from the world's most trusted brands.
                    </p>
                </div>

                {/* Brands Grid */}
                {brands?.length == 0 ? <div className="min-h-[70vh] w-full flex justify-center items-center">
                    <span className="text-2xl font-semibold text-green-600">
                        there aren't Brands yet
                    </span>
                </div> : brandsIsLoading ? <Loading/> : <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {brands?.map((brand) => (
                        <div
                            key={brand._id}
                            className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6"
                        >
                            <Link to={`/brands/${brand._id}`}>
                                <div className="h-32 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="max-h-24 w-auto object-contain transition duration-300 group-hover:scale-110"
                                    />
                                </div>

                                <div className="border-t mt-4 pt-4 text-center">
                                    <h2 className="font-bold text-lg text-slate-800">
                                        {brand.name}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>}
            </div>
        </section>
    );
}