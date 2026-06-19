// MyLessonsTableServer.jsx

import { getServerSession } from "@/lib/core/session";
import MyLessonsTableClient from "./MyLessonsTableClient";
import { getMyLessons } from "@/lib/action/lessons";

export default async function MyLessonsTableServer() {
  const user = await getServerSession();
  const lessons = await getMyLessons(user?.id);

  return (
    <MyLessonsTableClient
      initialLessons={lessons || []}
      user={user}
    />
  );
}