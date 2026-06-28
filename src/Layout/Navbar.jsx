import React, { useContext, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { BiHeart, BiLogOut } from "react-icons/bi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../APIs/cart_APIs";
import { Spinner } from "@heroui/react";
import { getWishlist } from "../APIs/wishlist";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const { userToken, setUserToken } = useContext(UserContext)

    const { data: cartProducts, isLoading: cartIsLoading } = useQuery({
        queryKey: ["cartProducts"],
        queryFn: getCart,
        enabled: !!userToken
    });

    const { data: wishListData, isLoading: wishlistIsLoading } = useQuery({
        queryKey: ["wishlistProducts"],
        queryFn: getWishlist,
        enabled: !!userToken
    });

    function logout() {
        setUserToken(null);
        localStorage.removeItem("userToken");
        navigate('/login')
    }

    const navLinkClass = ({ isActive }) =>
        `transition duration-300 font-medium ${isActive
            ? "text-green-600"
            : "text-slate-700 hover:text-green-600"
        }`;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"
                        >
                            Shopify
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center gap-8">
                            <li>
                                <NavLink to="/" className={navLinkClass}>
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/products" className={navLinkClass}>
                                    Products
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/categories" className={navLinkClass}>
                                    Categories
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/brands" className={navLinkClass}>
                                    Brands
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/contact-us" className={navLinkClass}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>

                        {/* Right Side */}
                        <div className="flex items-center gap-5">
                            {userToken ? <div className="flex items-center gap-5">
                                {/* Cart */}
                                <Link
                                    to="/cart"
                                    className="relative"
                                >
                                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                                        {cartIsLoading ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            cartProducts?.data?.numOfCartItems || 0
                                        )}
                                    </span>

                                    <CgShoppingCart className="text-3xl text-slate-700 transition" />
                                </Link>

                                {/* Wishlist */}
                                <Link
                                    to="/wish-list"
                                    className="relative group"
                                >

                                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                                        {wishlistIsLoading ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            wishListData?.data.count || 0
                                        )}
                                    </span>
                                    <BiHeart className="text-3xl text-slate-700 transition" />
                                </Link>

                                <button className="hidden lg:block" onClick={() => logout()}>
                                    <BiLogOut className="text-2xl font-bold rotate-180 cursor-pointer" />
                                </button>
                            </div> : <Link to={'/login'}>
                                <button className="hidden lg:block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition">
                                    Join us
                                </button>
                            </Link>}

                            {/* Login */}

                            {/* Mobile Button */}
                            <button
                                className="lg:hidden text-3xl text-slate-700"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-20 left-0 right-0 bg-white shadow-lg z-40 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col p-5 gap-4">
                    <li>
                        <NavLink
                            to="/"
                            className={navLinkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/products"
                            className={navLinkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/categories"
                            className={navLinkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            Categories
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/brands"
                            className={navLinkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            Brands
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/contact-us"
                            className={navLinkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </NavLink>
                    </li>

                    {!userToken ? <li>
                        <Link to={'/login'}>
                            <button className="bg-green-600 text-white py-3 w-full rounded-xl mt-2">
                                Join us
                            </button>
                        </Link>
                    </li> : <button onClick={() => logout()}>
                        <BiLogOut className="text-2xl font-bold rotate-180 cursor-pointer" />
                    </button>}
                </ul>
            </div>
        </>
    );
}