'use server'

import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
export const getUserInformation=async()=>{
   const res = await fetch(`${BASE_URL}/users`,
      {
        headers: await authHeader()
      }
    );
    return res.json();
}



//updating user
export const updateUserInformation=async(user)=>{
   const res = await fetch(`${BASE_URL}/users/update/${user._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json',
             ...await authHeader(),
           },
          body: JSON.stringify({ role: user.role, plan: user.plan })
        });
  
        const data = await res.json();
        return data;
}


// all lesson e specific creator er sob lesson gulo dekhar jonno
export const getSpecificCreatorInformation = async (creatorId) => {
  const res = await fetch(`${BASE_URL}/users/creator-info/${creatorId}`, {
    cache: 'no-store'
  });
  return res.json();
};

//Creator er sob lesson anar jonno. jodio eta ami age ekbar korchi user er nijer lessons gulo anar jonno , but code bujhar jonno eta alada kore korlam
export const getCreatorLessons = async (creatorId) => {
  const res = await fetch(`${BASE_URL}/lessons/creator/${creatorId}`, {
    cache: 'no-store'
  });
  return res.json();
};
