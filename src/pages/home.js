import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Workoutcard from "../components/workoutcards";
import Createworkout from "../components/createworkout";
import { useWorkoutsContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/UseAuthCintext";

const home = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchworkouts = async () => {
      const res = await fetch("https://work-bxsi.onrender.com/api/workouts", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.errorMsg);
        setIsLoading(false);
      }
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
        setIsLoading(false);
      }
    };

    if (user) {
      fetchworkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workout">
        <h2 className="wh">Workout History</h2>
        {error && <div className="error">{error}</div>}
        {isLoading && (
          <div className="fetch_load">
            <div className="waite">Loading....</div>
          </div>
        )}
        {workouts &&
          workouts.map((workout) => (
            <Workoutcard key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="addmnew">
        <Createworkout />
      </div>
    </div>
  );
};

export default home;
