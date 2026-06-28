import axios from "axios"

export const loginApi = async (data) => {
    return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
}