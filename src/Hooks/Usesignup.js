import { useState } from "react";
import { useAuthContext } from "./UseAuthCintext";

export const useSignup = () =>{
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup =async (email,password) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://work-bxsi.onrender.com/api/users/signup',{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        
        if(!response.ok){
        setIsLoading(false)
        setError(json.message)
        }
        // ......................string user in local storage....................
        if(response.ok){
           localStorage.setItem('user',JSON.stringify(json)) 

        //// ......................update auth context....................
        dispatch({type:'LOGIN', payload: json})
        setIsLoading(false)
        }
}  
return { signup, isLoading, error}
}