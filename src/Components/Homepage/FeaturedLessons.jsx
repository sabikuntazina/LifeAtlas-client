
import { getAllLessons } from "@/lib/api/getAllLessons";
import { getServerSession } from "@/lib/core/session";
import LessonCard from "../LessonCard";

export default async function FeaturedLessons() {
   const user = await getServerSession();
    const lessons = await getAllLessons();
  return (
    <section className="py-14 px-4 bg-[#081221]">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured <span className="text-[#3B82F6]">Lessons</span>
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Handpicked wisdom from the community
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {lessons?.slice(0, 4).map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              user={user}
            />
          ))}

        </div>

      </div>

    </section>
  );
}