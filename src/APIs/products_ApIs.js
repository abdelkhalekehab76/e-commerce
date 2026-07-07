import axios from "axios";

export function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
export function getSpecificProduct(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
}


export function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
export function getSpecificCategories(categoryId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
}


export function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}
export function getSpecificBrand(brandId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
}
export function getProductReviews(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`)
}



export const reviewProduct = async ({ productId, rating, reviewText }) => {

    const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
        {
            review: reviewText,
            rating: rating,
        },
        {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        }
    );

    return response.data;
};

