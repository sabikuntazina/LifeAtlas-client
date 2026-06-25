// MyLessonsTableServer.jsx

import { getServerSession } from "@/lib/core/session";
import MyLessonsTableClient from "./MyLessonsTableClient";
import { getMyLessons } from "@/lib/action/lessons";
import Pagination from "@/Components/Pagination";

export default async function MyLessonsTableServer({ searchParams }) {
  const params = await searchParams;
  const user = await getServerSession();


  if (!user?.id) {
    return <div className="text-gray-400 text-center">Please login to view your lessons.</div>;
  }


  const currentPage = Number(params?.page) || 1;

  const lessonData = await getMyLessons(user.id, currentPage);
  const lessons = lessonData?.data || [];
  const page = lessonData?.page || 1;
  const totalPage = lessonData?.totalPage || 1;

  return (
    <div>
      <MyLessonsTableClient initialLessons={lessons} user={user} />
      <Pagination currentPage={page} totalPages={totalPage} />
    </div>
  );
}
