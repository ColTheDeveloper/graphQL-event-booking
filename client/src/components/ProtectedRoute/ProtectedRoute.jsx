import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AuthState } from "../../context/AuthContext"



const ProtectedRoute=()=>{
    const {token}=AuthState()
    const location=useLocation()

    return(
        token?
            <Outlet />
        :
            <Navigate to="/auth" state={{from:location}} replace/>

    )
}
export default ProtectedRoute

export const UnAccessableWhileLoggedin=()=>{
    const {token}=AuthState()
    const location=useLocation()

    return(
        token?
            <Navigate to="/" state={{from:location}} replace />
        :
            <Outlet />    
    )
}