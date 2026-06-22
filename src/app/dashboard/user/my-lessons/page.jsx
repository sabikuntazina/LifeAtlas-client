// MyLessonsTableServer.jsx

import { getServerSession } from "@/lib/core/session";
import MyLessonsTableClient from "./MyLessonsTableClient";
import { getMyLessons } from "@/lib/action/lessons";
import Pagination from "@/Components/Pagination";

export default async function MyLessonsTableServer({ searchParams }) {
  const params = await searchParams;
  const user = await getServerSession();

  // 🛡️ সেফগার্ড: ইউজার লগইন না থাকলে ডেটা ফেচ করার দরকার নেই
  if (!user?.id) {
    return <div className="text-gray-400 text-center">Please login to view your lessons.</div>;
  }

  // কারেন্ট পেজ নাম্বার হ্যান্ডেলিং (স্ট্রিং থেকে নাম্বারে সেফ কনভার্ট)
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
