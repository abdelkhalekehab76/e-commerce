import axios from "axios"

export const loginApi = async (data) => {
    return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
}
export const registerApi = async (data) => {
    return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
}
export const verifyToken = async () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}