import { createContext } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzEyZmUxZmMzM2Q4MDAxMjFkNjc1OSIsIm5hbWUiOiJhYmRlbGtoYWxlayIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgxNjA4NTAwLCJleHAiOjE3ODkzODQ1MDB9.sW8cqNR4FCDhfGuiP9Le996mFFS1PWXzq8NaeKBadcE"


    return (
        <UserContext.Provider value={{userToken}}>
            {children}
        </UserContext.Provider>
    )
}
