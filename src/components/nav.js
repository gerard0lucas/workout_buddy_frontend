import React from "react";
import {Link} from "react-router-dom"
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/UseAuthCintext";
const navbar = () => {
    const {user} = useAuthContext()
    console.log(user);
    const logout = useLogout()
    const handleclick=()=>{
        logout() 
    }
    return ( 
        <div className="nav" >
            <Link style={{textDecoration: 'none'}} to="/">
            <h1>Workouts Buddy</h1>
            </Link>
            {user && (
            <div>
                <span className="ee">{user.email}</span>
            <button className="nav-links" onClick={handleclick}>Logout</button>
            </div>)}
            {!user && (
            <div className="links" >
                <Link to="/Login" className="nav-links">Login</Link>
                <Link to="/Signup" className="nav-links">Register</Link>
            </div>)}
            
            
            
        </div>
     );
}
 
export default navbar;