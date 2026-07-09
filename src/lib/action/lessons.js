'use server'
import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";


export const getAllLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons/all`);
  return res.json();
};


/* ---------------------------------------
   GET MY LESSONS (Dashboard Table)
----------------------------------------*/
export const getMyLessons = async (creatorId,page) => {
    if(!page){
    page=1
  }
  console.log(page)
  
  const res = await fetch(`${BASE_URL}/lessons/my/${creatorId}?page=${page}`,
    {
      headers: await authHeader(),
      cache: 'no-store'
    }
  );
  console.log("Data in response", res)
  return res.json();
};
export const getMyLessonsInProfile = async (creatorId) => {
  
  const res = await fetch(`${BASE_URL}/lessons/my/profile/${creatorId}`,
    {
      cache: 'no-store'
    }
  );
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

