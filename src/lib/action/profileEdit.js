const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
export const profileEdit=async(id,profileData)=>{
    const res = await fetch(`${BASE_URL}/profile/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData ),
  });

  return res.json();

}