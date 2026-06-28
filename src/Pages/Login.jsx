import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {


    const { register, handleSubmit, reset } = useForm()
    const { loginMutation, userToken, loginIsPending, loginIsError, loginError } = useContext(UserContext)
    const navigate = useNavigate()

    async function submitForm(data) {
        console.log(data)
        console.log(userToken)
        loginMutation(data, {
            onSuccess: () => {
                navigate('/');
                reset();
            }
        })
    }

    // async function login(data) {
    //     const response = await loginApi(data)
    //     console.log(response)
    // }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 to-green-500 p-12 text-white">
                    <h1 className="text-5xl font-bold mb-6">
                        Welcome Back 👋
                    </h1>

                    <p className="text-lg text-emerald-50 leading-relaxed">
                        Sign in to access your cart, wishlist,
                        orders and enjoy the best shopping
                        experience.
                    </p>

                    <div className="mt-10">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                            alt="shopping"
                            className="w-64 mx-auto opacity-90"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="p-6 md:p-10 lg:p-12">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Login
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Login to continue shopping
                        </p>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit(submitForm)}>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('email', {
                                    required: "email is required",
                                })}
                            />

                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('password', {
                                    required: "password is required"
                                })}
                            />
                        </div>

                        {/* Remember */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    className="accent-emerald-600"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition duration-300"
                            disabled={loginIsPending}
                        >
                            {loginIsPending ? 'loading...' : 'Login'}
                        </button>
                        {loginIsError && <p className="text-red-600 font-semibold text-center">{loginError.response.data.message}</p>}

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="border-t"></div>

                            <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-white px-3 text-slate-400 text-sm">
                                OR
                            </span>
                        </div>

                        {/* Google */}
                        <button
                            type="button"
                            className="w-full border border-slate-200 py-3 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-slate-50 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-emerald-600 font-semibold hover:text-emerald-700"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}