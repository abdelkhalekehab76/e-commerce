import axios from "axios";
import { useContext, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import useSWR from "swr";

export const CartContext = createContext()

export default function CartContextProvider({ children }) {

    const { userToken } = useContext(UserContext)



    const getUserLoggedCart = async () => {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v2/cart',
            {
                headers: {
                    token: userToken
                }
            }
        )
        console.log(response.data.data)
        return response.data.data
    }

    const { data: cartProducts, isLoading, mutate } = useSWR(
        "cart",
        getUserLoggedCart,
    )

    const addProductToCart = async (productId) => {
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v2/cart`, {
                productId: productId
            }, {
                headers: {
                    token: userToken
                }
            }
            )
            console.log(response)
            mutate();
        } catch (err) {
            console.log(err.response)
        }
    }

    console.log(cartProducts)

    const deleteProductFromCart = async (productId) => {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
                headers: {
                    token: userToken
                }
            }
            )
            console.log(response)
            mutate();
        } catch (err) {
            console.log(err.response)
        }
    }





    return (

        <CartContext.Provider value={{ addProductToCart, deleteProductFromCart, cartProducts }}>
            {children}
        </CartContext.Provider>
    )
}