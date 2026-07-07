// src/context/UserContext.jsx
import { createContext, useState } from "react";
import { loginApi, registerApi } from "../APIs/auth_APIs"; // تأكد من استيراد registerApi
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(() => localStorage.getItem("userToken"));

    // Login Mutation
    const { mutate: loginMutation, data: userData, isPending: loginIsPending, isError: loginIsError, error: loginError } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setUserToken(data.data.token);
            localStorage.setItem('userToken', data.data.token);
            toast.success('Login Success');
        },
        onError: (err) => {
            console.log(err.response?.data?.message);
            toast.error(err.response?.data?.message);
        }
    });

    // Register Mutation (الجديدة)
    const { mutate: registerMutation, isPending: registerIsPending, isError: registerIsError, error: registerError } = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setUserToken(data.data.token);
            localStorage.setItem('userToken', data.data.token);
            toast.success('Account Created Successfully!');
        },
        onError: (err) => {
            console.log(err.response?.data?.message);
            toast.error(err.response?.data?.message);
        }
    });

    return (
        <UserContext.Provider value={{
            loginMutation, userData, userToken, setUserToken, loginIsPending, loginIsError, loginError,
            registerMutation, registerIsPending, registerIsError, registerError // تم تمريرهم هنا
        }}>
            {children}
        </UserContext.Provider>
    );
}