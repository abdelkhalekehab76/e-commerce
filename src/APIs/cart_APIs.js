import axios from "axios";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzEyZmUxZmMzM2Q4MDAxMjFkNjc1OSIsIm5hbWUiOiJhYmRlbGtoYWxlayIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgxNjA4NTAwLCJleHAiOjE3ODkzODQ1MDB9.sW8cqNR4FCDhfGuiP9Le996mFFS1PWXzq8NaeKBadcE"
export const getCart = async () => {
    return axios.get('https://ecommerce.routemisr.com/api/v2/cart', {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}
export const addToCart = async (productId) => {
    return axios.post('https://ecommerce.routemisr.com/api/v2/cart', productId, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}
export const updateProduct = async ({ productId, count }) => {
    return axios.put(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, { count }, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}
export const removeProductFomCart = async (productId) => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}

export const clearCart = async () => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v2/cart`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}


export const checkout = async ({cartId,shippingAddress}) => {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,shippingAddress, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}

export const getAllOrders = async (ownerId) => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}


