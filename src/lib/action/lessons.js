'use server'
import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";


export const getAllLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons/all`);
  return res.json();
};


/* ---------------------------------------
   GET MY LESSONS (Dashboard Table)
----------------------------------------*/
export const getMyLessons = async (creatorId) => {
  
  const res = await fetch(`${BASE_URL}/lessons/my/${creatorId}`,
    {
      headers: await authHeader(),
    }
  );
  console.log("Data in response", res)
  return res.json();
};



/* ---------------------------------------
   UPDATE VISIBILITY (public/private)
----------------------------------------*/
export const updateVisibility = async (id, visibility) => {
  const res = await fetch(`${BASE_URL}/lessons/visibility/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify({ visibility }),
  });

  return res.json();
};

/* ---------------------------------------
   UPDATE ACCESS (free/premium)
----------------------------------------*/
export const updateAccess = async (id, access, userPlan) => {
  const res = await fetch(`${BASE_URL}/lessons/access/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify({ access, userPlan }),
  });

  return res.json();
};



/* ---------------------------------------
   DELETE LESSON
----------------------------------------*/
export const deleteLesson = async (id) => {
  const res = await fetch(`${BASE_URL}/lessons/${id}`, {
    method: "DELETE",
    headers:await authHeader(),
  });

  return res.json();
};

