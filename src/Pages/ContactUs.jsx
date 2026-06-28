import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium">
          Contact Shopify
        </span>

        <h1 className="text-5xl font-bold mt-6 text-slate-800">
          Get In Touch
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Have questions about our products or services? We'd love to hear from
          you. Send us a message and our team will respond as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Send Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Subject
              </label>

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FaEnvelope className="text-emerald-600 text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Email Address
                </h3>

                <p className="text-gray-500">
                  support@shopify.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FaPhoneAlt className="text-emerald-600 text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Phone Number
                </h3>

                <p className="text-gray-500">
                  +20 100 123 4567
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FaMapMarkerAlt className="text-emerald-600 text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Location
                </h3>

                <p className="text-gray-500">
                  Cairo, Egypt
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold">
              Follow Us
            </h3>

            <p className="mt-2 text-white/80">
              Stay connected with us on social media.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="size-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="size-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="size-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}