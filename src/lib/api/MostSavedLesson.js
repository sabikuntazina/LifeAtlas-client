"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const getMostSavedLessons = async () => {
  try {
    const res = await fetch(`${baseUrl}/lessons/most-saved`, {
      cache: 'no-store', 
    });
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};