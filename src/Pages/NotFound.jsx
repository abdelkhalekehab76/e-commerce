import { Navigate, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate =useNavigate()
    return (
        <div className="fixed top-1/2 left-1/2 text-center -translate-1/2">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">404</h1>

            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p className="mt-2 text-gray-600 text-center max-w-md">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>

            <button
                className="mt-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-white font-medium transition hover:bg-emerald-800"
                onClick={()=>navigate('/')}
            >
                Back to Home
            </button>
        </div>
    );
};
