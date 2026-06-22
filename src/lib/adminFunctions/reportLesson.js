'use server'
import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const postReportLesson=async(reportLessonData)=>{
    const res= await fetch(`${BASE_URL}/report/lesson` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        ...await authHeader(),
      },
       body : JSON.stringify(reportLessonData)
    })
    const data= await res.json();
    console.log(data)
    return data
}

export const getAllReportedLessons=async()=>{
   const res = await fetch(`${BASE_URL}/report/lesson`,
      {
        headers: await authHeader()
      }
    );
    return res.json();
}
// Delete Reported Lesson permanently
export const deleteReportedLessonPermanently = async (id) => {
  const res = await fetch(`${BASE_URL}/report/lessons/delete/permanently/${id}`, {
    method: "DELETE",
    headers:await authHeader(),
  });

  return res.json();
};

//Delete Reported lesson from the report Collection to ignore

// Delete Reported Lesson permanently
export const deleteReportedLessonToIgnore = async (id) => {
  const res = await fetch(`${BASE_URL}/report/lessons/delete/ignore/${id}`, {
    method: "DELETE",
    headers:await authHeader(),
  });

  return res.json();
};