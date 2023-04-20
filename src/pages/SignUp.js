import React from "react";
import { useState } from "react";
import { useSignup } from "../Hooks/Usesignup";

const Signup = () => {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const {signup,isLoading,error} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await signup(email,password)
    }

    return ( 
        <div className="background">
        <form className="signup" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
            <h3>Register Now</h3>
            <label>Email</label>
            <input type="email" value={email} placeholder="Email" onChange={(e)=>setemail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
            {!isLoading && <button>Login</button>}
        {isLoading && <div className="waite">Please waite...</div>}
        </form>
        </div>
     );
}
 
export default Signup;