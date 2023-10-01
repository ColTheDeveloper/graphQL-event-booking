import { NavLink, Link } from "react-router-dom"
import "./Navbar.css"
import { AuthState } from "../../context/AuthContext"

const Navbar=()=>{
    const {logout,token}=AuthState()
    return(
        <div className="Navbar">
            <div>
                <h1><Link to="/">EventMaster</Link></h1>
            </div>
            <div> 
                {token?<>
                    <NavLink to="/bookings">Bookings</NavLink>
                    <a onClick={logout}>Logout</a>
                </>:
                    <NavLink to="/auth">Login</NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar