// src/Components/ProductRating.jsx
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { reviewProduct } from "../APIs/products_ApIs";
import { queryClient } from "../main";

export default function ProductRating({ productId }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // TanStack Query Mutation
    const mutation = useMutation({
        mutationFn: reviewProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['productReviews'],
            });
            setReviewText(""); // Clear fields
            setRating(0);      // Reset stars
            setErrorMessage("");
            console.log(data);
        },
        onError: (error) => {
            const msg = error.response?.data?.message || "Something went wrong while submitting your review.";
            if (msg === "fail") {
                setErrorMessage("You have already reviewed this product.");
            } else {
                setErrorMessage(msg);
            }
            console.log(msg);
        }
    });

    const handleSubmitReview = (e) => {
        e.preventDefault();

        // 1. التأكد من اختيار النجوم أولاً
        if (rating === 0) {
            setErrorMessage("Please select a star rating first.");
            return;
        }

        // 2. التأكد من كتابة تعليق (الشرط الجديد)
        if (!reviewText.trim()) {
            setErrorMessage("Please write a comment or review text before submitting.");
            return;
        }

        setErrorMessage("");

        // Trigger API mutation
        mutation.mutate({
            productId,
            rating,
            reviewText,
        });
    };

    return (
        <form
            onSubmit={handleSubmitReview}
            className="flex flex-col gap-4 p-6 bg-content1 rounded-2xl shadow-medium w-full border border-divider text-left"
            dir="ltr"
        >
            <h3 className="text-lg font-bold text-foreground">Add Product Review</h3>

            {/* Stars Section */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-default-600">Your Rating:</label>
                <div className="flex items-center gap-1 justify-start">
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        const isFilled = starValue <= (hover || rating);

                        return (
                            <button
                                key={starValue}
                                type="button"
                                disabled={mutation.isPending}
                                className={`p-1 transition-all duration-200 transform outline-none rounded-full focus:scale-110 ${mutation.isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-125"
                                    }`}
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => !mutation.isPending && setHover(starValue)}
                                onMouseLeave={() => !mutation.isPending && setHover(0)}
                            >
                                <Star
                                    size={28}
                                    className={`transition-colors duration-200 ${isFilled
                                        ? "fill-warning text-warning drop-shadow-[0_0_6px_rgba(234,179,8,0.3)]"
                                        : "text-default-300 fill-transparent"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Textarea Section */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-default-600">Your Review (Required)</label>
                <textarea
                    placeholder="Write your experience with the product here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={mutation.isPending}
                    rows={4}
                    className="w-full p-3 text-left bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors duration-200 focus:border-primary hover:border-default-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none text-foreground placeholder:text-default-400 text-sm"
                />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="text-sm p-3 rounded-lg font-medium bg-danger-50 text-danger">
                    {errorMessage}
                </div>
            )}

            {/* Success Message */}
            {mutation.isSuccess && (
                <div className="text-sm p-3 rounded-lg font-medium bg-success-50 text-success">
                    Your review has been submitted successfully! Thank you.
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                className="font-bold shadow-sm bg-transparent text-emerald-700 border-2 border-emerald-700 hover:bg-emerald-50"
                isLoading={mutation.isPending}
                spinner={<Spinner color="success" size="sm" />}
            >
                Submit Review
            </Button>
        </form>
    );
}