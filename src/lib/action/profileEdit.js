"use server"
import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
export const profileEdit=async(id,profileData)=>{
    const res = await fetch(`${BASE_URL}/profile/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(profileData ),
  });

  return res.json();

}