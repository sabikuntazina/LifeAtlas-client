import { headers } from "next/headers";
import { auth } from "../auth";
import { authClient } from "../auth-client";

export const getServerSession=async()=>{

    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    const user = session?.user;
    return user
}

export const getToken= async()=>{
  
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.session?.token ||null
}

export const authHeader= async()=>{
  const token= await getToken();
  console.log("Token hobe: ",token)
  const header={
    authorization: `Bearer ${token}`
  }
  return token? header : {}
}