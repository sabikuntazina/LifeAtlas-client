'use server'
import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const postReportLesson=async(reportLessonData)=>{
    const res= await fetch(`${BASE_URL}/report/lesson` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        // ...await authHeader(),
      },
       body : JSON.stringify(reportLessonData)
    })
    const data= await res.json();
    console.log(data)
    return data
}