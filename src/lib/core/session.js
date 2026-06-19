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