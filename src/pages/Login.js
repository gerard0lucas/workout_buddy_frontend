import React from "react";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
const Login = () => {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const {login,isLoading,error} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        await login(email,password)
    }

    return ( 
        <div className="background">
        <form className="signup" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
            <h3>Login Here</h3>
            <label>Email</label>
            <input type="email" value={email} placeholder="Email" onChange={(e)=>setemail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
            
            {!isLoading && <button>Login</button>}
        {isLoading && <div className="logwaite">Please waite...</div>}
        </form>
        </div>
     );
}
 
export default Login;