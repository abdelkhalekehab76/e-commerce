import axios from "axios"
export const getWishlist = async () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            token:localStorage.getItem('userToken')
        }
    })
}
export const addToWishlist = async (productId) => {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', productId, {
        headers: {
            token:localStorage.getItem('userToken')
        }
    })
}
export const removeFromWishlist = async (productId) => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token:localStorage.getItem('userToken')
        }
    })
}
