"use server"

import { authHeader } from "../core/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

// 📥 POST SAVED LESSON
export const postSavedLessons = async (saveData) => {
  try {
    const res = await fetch(`${BASE_URL}/savedlessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...await authHeader(),
      },
      body: JSON.stringify(saveData)
    });

    const contentType = res.headers.get("content-type");
 
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        return errorData; 
      }
      const errorText = await res.text();
      return { success: false, message: errorText || "Server error occurred" };
    }

   
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch Error in postSavedLessons:", err);
    return { success: false, message: "Network error, please try again!" };
  }
};


// ❤️ POST LIKED LESSON
export const postLikedLessons = async (likeData) => {
  try {
    const res = await fetch(`${BASE_URL}/likedlessons`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...await authHeader(),
      },
      body: JSON.stringify(likeData)
    });

    const contentType = res.headers.get("content-type");
    
    
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        return errorData; // ব্যাকএন্ডের { success: false, message: "..." } রিটার্ন করবে
      }
      const errorText = await res.text();
      return { success: false, message: errorText || "Server error occurred" };
    }

    // সবকিছু ঠিক থাকলে সাকসেস ডাটা রিটার্ন
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch Error in postLikedLessons:", err);
    return { success: false, message: "Network error, please try again!" };
  }
};
//to Store the comment 
export const postComment=async(commentData)=>{
   const res= await fetch(`${BASE_URL}/comment` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        ...await authHeader(),
      },
       body : JSON.stringify(commentData)
    })
    const data= await res.json();
    console.log(data)
    return data
    
}
