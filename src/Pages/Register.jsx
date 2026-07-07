// src/Components/Register.jsx
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Register() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { registerMutation, registerIsPending, registerIsError, registerError } = useContext(UserContext);
    const navigate = useNavigate();

    const password = watch("password");

    async function submitForm(data) {
        console.log(data);
        registerMutation(data, {
            onSuccess: () => {
                reset();
                navigate('/');
            }
        });
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 to-green-500 p-12 text-white">
                    <h1 className="text-5xl font-bold mb-6">
                        Join Us! 🚀
                    </h1>
                    <p className="text-lg text-emerald-50 leading-relaxed">
                        Create an account today to get access to custom deals, fast checkout, and to track your packages easily.
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
                            Create Account
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Sign up now to start shopping
                        </p>
                    </div>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit(submitForm)}>

                        {/* Full Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('name', { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('email', { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-slate-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('phone', { 
                                    required: "Phone number is required",
                                    pattern: { value: /^01[0125][0-9]{8}$/, message: "Invalid Egyptian phone number" }
                                })}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-slate-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('password', { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password (rePassword) */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-slate-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                {...register('rePassword', { 
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                            {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition duration-300 mt-4"
                            disabled={registerIsPending}
                        >
                            {registerIsPending ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        {/* Global API Error Display */}
                        {registerIsError && (
                            <p className="text-red-600 font-semibold text-center text-sm mt-2">
                                {registerError?.response?.data?.message || "Registration failed. Try again."}
                            </p>
                        )}
                    </form>

                    <p className="text-center mt-6 text-slate-600 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-emerald-600 font-semibold hover:text-emerald-700"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}