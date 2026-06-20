"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFavoriteLessons=async(id)=>{
   const res= await fetch(`${baseUrl}/saved/lessons/favorite/${id}`);
  const data= await res.json();
  return data;
}