"use server";

import { authHeader } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const getAllLessons=async()=>{
  const res= await fetch(`${baseUrl}/lessons/all`,{
    headers:await authHeader(),
  }
    
  );
  const lessonData= await res.json();
  return lessonData;
}

export const getLessonById = async (id) => {
  const res = await fetch(`${baseUrl}/api/lessons/${id}`);
  return res.json();
};

export const getLessonPubliclyById=async(id)=>{
  const res = await fetch(`${baseUrl}/lessons/${id}`);
  return res.json();
}


export const updateLesson = async (id, lessonData) => {
  const res = await fetch(`${baseUrl}/lessons/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData),
  });

  return await res.json();
};

