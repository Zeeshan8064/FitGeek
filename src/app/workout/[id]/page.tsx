"use client"
import React, { useEffect, useState } from "react";
import "./workoutPage.css";

const WorkoutPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    const workoutIdFromUrl = window.location.pathname.split("/").pop();
    setWorkoutId(workoutIdFromUrl || null);
  }, []);

  useEffect(() => {
    if (!workoutId) return; // Avoid fetching if workoutId is not available

    const getWorkout = async () => {
      console.log("getWorkout", workoutId);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts/${workoutId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.ok) {
          setData(result.data);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    getWorkout();
  }, [workoutId]); // Dependency on workoutId

  if (!workoutId) {
    return <div>Loading...</div>; // Show loading until workoutId is available
  }

  return (
    <div className="workout">
    <h1 className="workout">{data?.name} Day</h1>
    <div className="workout__exercises">
      {data?.exercises?.map((item: any, index: number) => (
        <div
          key={index}
          className={
            index % 2 === 0
              ? "workout__exercise"
              : "workout__exercise workout__exercise--reverse"
          }
        >
          <h3>{index + 1}</h3>
          <div className="workout__exercise__image">
            <img src={item.imageURL} alt="" />
          </div>
          <div className="workout__exercise__content">
            <h2>{item.name}</h2>
            <span>
              {item.sets} sets x {item.reps}
            </span>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  );
};

export default WorkoutPage;
