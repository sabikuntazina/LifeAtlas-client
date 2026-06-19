import LessonCard from "@/Components/LessonCard";
import { getAllLessons } from "@/lib/api/getAllLessons";
import { getServerSession } from "@/lib/core/session";

export default async function PublicLessonsPage() {
  const user = await getServerSession();
  const lessons = await getAllLessons();

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-12">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Public{" "}
            <span className="text-[#3B82F6]">Life Lessons</span>
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Wisdom shared by the community — ideas, reflections, and lessons that shape better lives.
          </p>

          {/* subtle accent line */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-[2px] bg-[#3B82F6] rounded-full opacity-70"></div>
          </div>

        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {lessons?.length > 0 ? (
            lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={user}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No lessons found.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}