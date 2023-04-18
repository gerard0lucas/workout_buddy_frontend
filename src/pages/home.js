import React from "react";
import { useEffect } from "react"
import Workoutcard from "../components/workoutcards"
import Createworkout from "../components/createworkout";
import { useWorkoutsContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/UseAuthCintext";




const home = () => {
const {workouts, dispatch} = useWorkoutsContext()
const {user} = useAuthContext()
useEffect(()=>{
    const fetchworkouts = async()=>{
        const res =await fetch('https://work-bxsi.onrender.com/api/workouts',{
            headers:{
                'authorization':`Bearer ${user.token}`
            }
        }); 
    const data =await res.json()

    if(res.ok){
        dispatch({type: 'SET_WORKOUTS', payload: data})
    }
    }

    if(user){
        fetchworkouts() 
    }
    
},[dispatch,user])




    return ( 
        <div className="home">
            <div className="workout">
            <h2 className="wh">Workout History</h2>
                {workouts && workouts.map((workout)=>(
                  <Workoutcard key={workout._id} workout={workout} /> 
                ))}
              
            </div>
            <div className="addmnew">
                <Createworkout  />
            </div>
        </div>
     );
}
 
export default home;

