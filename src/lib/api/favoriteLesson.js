"use server";

import { authHeader } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFavoriteLessons=async(id)=>{
   const res= await fetch(`${baseUrl}/saved/lessons/favorite/${id}`,{
    headers:await authHeader(),
   });
  const data= await res.json();
  return data;
}
// export const getLessonById = async (id) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`, {
//       cache: 'no-store'
//     });

//     if (!res.ok) {
//       console.error(`Lesson API error for ID ${id}: Status ${res.status}`);
//       return null; // সার্ভার এরর দিলে null পাঠান
//     }

//     const textData = await res.text();
//     if (!textData) return null; // রেসপন্স ফাঁকা হলে null পাঠান

//     return JSON.parse(textData);
//   } catch (error) {
//     console.error(`Error in getLessonById for ID ${id}:`, error);
//     return null; // ক্রাশ না করে null রিটার্ন
//   }
// };