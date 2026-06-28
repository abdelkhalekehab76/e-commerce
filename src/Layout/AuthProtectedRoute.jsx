import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function AuthProtectedRoute({children}) {

    const { userToken } = useContext(UserContext);
    console.log(userToken)

    return !userToken ? children : <Navigate to={'/'} />
}
