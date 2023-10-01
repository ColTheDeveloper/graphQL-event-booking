import { createContext,useContext ,useState} from "react";

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [token,setToken]=useState(null)
    const [userId,setUserId]=useState(null)

    const logout=()=>{
        setToken(null)
        setUserId(null)
    }
    return(
        <AuthContext.Provider value={{token,setToken,logout,userId,setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthState=()=>{
    return useContext(AuthContext)
}

export default AuthProvider