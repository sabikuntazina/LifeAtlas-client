'use server'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
export const getUserInformation=async()=>{
   const res = await fetch(`${BASE_URL}/users`,
      // {
      //   headers: await authHeader()
      // }
    );
    return res.json();
}

//updating user
export const updateUserInformation=async(user)=>{
   const res = await fetch(`${BASE_URL}/users/update/${user._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: user.role, plan: user.plan })
        });
  
        const data = await res.json();
        return data;
}