import { useAuthContext } from "./UseAuthCintext";
import { useWorkoutsContext } from "../Hooks/useWorkoutContext";

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch:dispatchWorkout} = useWorkoutsContext()

    const logout =()=>{
        // ..........................remove from local storage........................
        localStorage.removeItem('user')

         // ..........................remove state........................
         dispatch({type:'LOGOUT'})
         dispatchWorkout({type: 'SET_WORKOUTS', payload: null})
    }
    return logout
}