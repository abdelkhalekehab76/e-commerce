import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../APIs/cart_APIs'
import { verifyToken } from '../APIs/auth_APIs'

export default function AllOrders() {
    // حالة لتخزين الـ ID الخاص بالطلب المفتوح حالياً (Accordion)
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const { data: userVerify } = useQuery({
        queryKey: ['userVerify'],
        queryFn: verifyToken,
    })

    const userId = userVerify?.data?.decoded?.id;

    const { data: allOrdersData, isLoading, isError } = useQuery({
        queryKey: ['allOrders', userId],
        queryFn: () => getAllOrders(userId),
        enabled: !!userId
    })

    // استخراج مصفوفة الطلبات من الـ API data
    const orders = allOrdersData?.data || [];

    const toggleOrder = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center py-12 text-red-500 font-semibold bg-gray-50 min-h-screen">
                حدث خطأ أثناء تحميل الطلبات، يرجى المحاولة لاحقاً.
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl shadow-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
                        <p className="text-sm text-gray-500">Track and review all your orders</p>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-500">
                        لا توجد طلبات سابقة حالياً.
                    </div>
                ) : (
                    orders.slice().reverse().map((order) => {
                        const isExpanded = expandedOrderId === order._id;
                        const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        });

                        return (
                            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">

                                {/* Accordion Header */}
                                <div
                                    onClick={() => toggleOrder(order._id)}
                                    className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                                            <p className="text-xs text-gray-400 mt-1 flex items-center">
                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {formattedDate}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status Badges */}
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {order.isPaid ? '✓ Paid' : '⚠ Not Paid'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {order.isDelivered ? '✓ Delivered' : 'Not Delivered'}
                                        </span>
                                    </div>

                                    {/* Price & Toggle Arrow */}
                                    <div className="flex items-center space-x-4 ml-auto sm:ml-0">
                                        <span className="text-lg font-bold text-emerald-600">{order.totalOrderPrice.toLocaleString()} EGP</span>
                                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                                            <svg className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100 p-6 bg-white space-y-6 animate-fadeIn">

                                        {/* Financial Summary */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white text-gray-500 rounded-lg shadow-sm border border-gray-100">💳</div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Payment Method</p>
                                                    <p className="font-semibold text-gray-800">{order.paymentMethodType}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white text-gray-500 rounded-lg shadow-sm border border-gray-100">🚚</div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Shipping Price</p>
                                                    <p className="font-semibold text-gray-800">{order.shippingPrice} EGP</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white text-gray-500 rounded-lg shadow-sm border border-gray-100">🏷️</div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Tax Price</p>
                                                    <p className="font-semibold text-gray-800">{order.taxPrice} EGP</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white text-emerald-600 rounded-lg shadow-sm border border-gray-100">💵</div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Total Price</p>
                                                    <p className="font-bold text-emerald-600">{order.totalOrderPrice.toLocaleString()} EGP</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items List */}
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2">
                                                Items ({order.cartItems?.length || 0})
                                            </h4>
                                            {order.cartItems?.map((item) => (
                                                <div key={item._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={item.product?.imageCover || 'https://via.placeholder.com/60'}
                                                            alt={item.product?.title || 'Product'}
                                                            className="w-14 h-14 object-cover rounded-xl bg-gray-100 border"
                                                        />
                                                        <div>
                                                            <h5 className="font-medium text-gray-800 text-sm line-clamp-1">{item.product?.title || 'Unknown Product'}</h5>
                                                            <p className="text-xs text-gray-500 mt-1">{item.price} EGP</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                                                        Qty: {item.count}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Customer Details Footer */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm">👤</span>
                                                <span>Customer: <strong className="text-gray-700">{order.user?.name}</strong></span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm">✉️</span>
                                                <span className="truncate">{order.user?.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm">📞</span>
                                                <span>{order.user?.phone || 'N/A'}</span>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        );
                    })
                )}

                {/* Footer Banner */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 text-white flex items-center space-x-4 shadow-md">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        🛡️
                    </div>
                    <div>
                        <h4 className="font-bold">Thanks for shopping with us!</h4>
                        <p className="text-xs text-emerald-100 mt-0.5">We appreciate your trust and support.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}