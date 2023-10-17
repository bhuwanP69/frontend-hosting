import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    // const fetchWorkouts = async () => {
    //   const url = import.meta.env.REACT_APP_API_URL;
    //   const response = await fetch(`${url}/api/workouts`)
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({type: 'SET_WORKOUTS', payload: json})
    //   }
    // }
    const fetchWorkouts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(apiUrl);
    
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }
    
        const json = await response.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home