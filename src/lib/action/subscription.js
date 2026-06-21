    "use server"

import { authHeader } from "../core/session";

    const baseUrl= process.env.NEXT_PUBLIC_SERVER_URL

 export const createSubscriptionData=async(subInfo)=>{
      const res= await fetch(`${baseUrl}/subscription` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        ...await authHeader(),
      },
       body : JSON.stringify(subInfo)
    })
    const data= await res.json();
    // console.log(data)
    return data;
}