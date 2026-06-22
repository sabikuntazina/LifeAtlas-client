import LessonCard from "@/Components/LessonCard";
import Pagination from "@/Components/Pagination";
import SearchFilter from "@/Components/SearchFilter";

import { getAllLessons } from "@/lib/api/getAllLessons";
import { getServerSession } from "@/lib/core/session";

export default async function PublicLessonsPage({ searchParams }) {
  const params = await searchParams;
  const user = await getServerSession();
  
  // 🎯 পুরো params অবজেক্টটি পাঠানো হচ্ছে (যা সার্চ, ফিল্টার ও প্যাগিনেশন একসাথে হ্যান্ডেল করবে)
  const lessonData = await getAllLessons(params);
  
  const lessons = lessonData?.data || [];
  const page = lessonData?.page || 1;
  const totalPage = lessonData?.totalPage || 1;

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Public <span className="text-[#3B82F6]">Life Lessons</span>
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Wisdom shared by the community — ideas, reflections, and lessons that shape better lives.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-[2px] bg-[#3B82F6] rounded-full opacity-70"></div>
          </div>
        </div>

        {/* 🎯 SEARCH & FILTER CONTROLS BAR */}
        <SearchFilter />

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={user}
                lessonData={lessonData}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-500 font-semibold text-lg tracking-wide border-2 border-dashed border-[#223753] rounded-2xl bg-[#11243A]/10">
              🔍 No lessons match your active search filters.
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <Pagination 
          currentPage={page} 
          totalPages={totalPage} 
        />

      </div>
    </div>
  );
}