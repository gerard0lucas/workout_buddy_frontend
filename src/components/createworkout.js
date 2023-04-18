import React, { useState } from "react";
import { useWorkoutsContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/UseAuthCintext";

const createworkout = () => {
    const {dispatch} = useWorkoutsContext()
    const [title,settitle] = useState("");
    const [load,setload] = useState("");
    const [reps,setreps] = useState("");
    const [error,seterror] = useState(null);
    const {user} = useAuthContext()
    const email = user.email

    const create = async(e)=>{
        e.preventDefault();

        if(!user){
            console.log("error");
            return
        }


        const workout = { title, reps, load, email}
        
        const response = await fetch("https://work-bxsi.onrender.com/api/workouts",{
            method:'post',
            headers:{'content-Type':'application/json',
                    'authorization':`Bearer ${user.token}`},
            body:JSON.stringify(workout)
        })
        const json = await response.json() 
        if(!response.ok){
          seterror(json.error)  
        }
        if(response.ok){
            seterror(null) 
            settitle("")
            setload("")
            setreps("")
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            
            
        }
    }


    return ( 
        <form className="createworkout" onSubmit={create}>
            <div className="createform">
                <h2>ADD NEW</h2>
                <label>Excersize name:</label>
                <input type="text" required placeholder="Workout Name" onChange={(e)=>{settitle(e.target.value)}} value={title} />
                <label>Load (kg):</label>
                <input type="number" required placeholder="Loads in kilograms" onChange={(e)=>{setload(e.target.value)}} value={load} />
                <label>Reps:</label>
                <input type="number" required placeholder="Number of reps" onChange={(e)=>{setreps(e.target.value)}} value={reps} />
                {error && <div> {error} </div>}
                <button type="submit">submit</button>
            </div>
            
        </form>
     );
}
 
export default createworkout;