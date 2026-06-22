"use server";

import { authHeader } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllLessons = async (queryParams) => {
  const page = queryParams?.page || 1;
  const search = queryParams?.search || "";
  const category = queryParams?.category || "";
  const tone = queryParams?.tone || "";
  const sortBy = queryParams?.sortBy || "newest";


  const stringParams = new URLSearchParams({
    page: String(page),
    search,
    category,
    tone,
    sortBy
  });

  const res = await fetch(`${baseUrl}/lessons/all?${stringParams.toString()}`, {
    cache: 'no-store' 
  });
  
  return res.json();
};
//done
export const getLessonById = async (id) => {
  const res = await fetch(`${baseUrl}/api/lessons/${id}`,
    {
      headers: await authHeader()
    }
  );
  return res.json();
};

export const getLessonPubliclyById = async (id) => {
  const res = await fetch(`${baseUrl}/lessons/${id}`);
  return res.json();
};

export const updateLesson = async (id, lessonData) => {
  const res = await fetch(`${baseUrl}/lessons/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(lessonData),
  });

  return await res.json();
};
