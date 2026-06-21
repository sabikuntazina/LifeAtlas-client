"use server";

import { authHeader } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const postLesson = async (postData) => {
  const res = await fetch(`${baseUrl}/lessons`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(postData),
  });
  const data = await res.json();
  return data
};
