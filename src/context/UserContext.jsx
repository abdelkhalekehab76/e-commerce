import { createContext, useState } from "react";
import { loginApi } from "../APIs/auth_APIs";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(() => localStorage.getItem("userToken"))

    const { mutate: loginMutation, data: userData, isPending: loginIsPending, isError: loginIsError, error: loginError } = useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            // console.log(data)
            // console.log(data.data.token)
            setUserToken(data.data.token)
            localStorage.setItem('userToken', data.data.token)
            toast.success('Login Success')
        },
        onError: (err) => {
            console.log(err.response.data.message)
        }
    })


    return (
        <UserContext.Provider value={{ loginMutation, userData, userToken, setUserToken, loginIsPending, loginIsError, loginError }}>
            {children}
        </UserContext.Provider>
    )
}
