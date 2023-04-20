import React from "react";
import { useState } from "react";
import { useWorkoutsContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/UseAuthCintext";

const workoutcard = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handledelete = async () => {
    setIsLoading(true)

    if (!user) {
      console.log("error");
      return;
    }

    const res = await fetch(`https://work-bxsi.onrender.com/api/workouts/${workout._id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
      setIsLoading(false);
    }
    if (!res.ok) {
      setError(data.errorMsg);
    }
  };

  return (
    <div className="workoutdetails">
      {error && <div>{error}</div>}
      <div className="head">
        <h3 className="workouttitle">{workout.title}</h3>
        {!isLoading && (
          <button className="deleteworkout" onClick={handledelete}>
            Delete
          </button>
        )}
        {isLoading && <div className="card_loading">Loading...</div>}
      </div>

      <div className="det">
        <p className="workoutload">
          <strong>load</strong> {workout.load}
        </p>
        <p className="workoutreps">
          <strong>reps</strong> {workout.reps}
        </p>
      </div>
      <p className="createdat">created: {workout.createdAt}</p>
    </div>
  );
};

export default workoutcard;
