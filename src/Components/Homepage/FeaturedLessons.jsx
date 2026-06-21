import { getServerSession } from "@/lib/core/session";
import LessonCard from "../LessonCard";
import { getAllFeaturedLessons } from "@/lib/adminFunctions/featuredFunction";

export default async function FeaturedLessons() {
  const user = await getServerSession();
  
  let lessons = [];
  try {
    lessons = await getAllFeaturedLessons();
  } catch (error) {
    console.error("Failed to load featured lessons:", error);
  }

  return (
    <section className="py-20 px-4 bg-[#081221] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-bold uppercase tracking-wider">
            ⚡ Premium Curation
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Featured <span className="text-[#3B82F6] bg-gradient-to-r from-[#3B82F6] to-cyan-400 bg-clip-text text-transparent">Lessons</span>
          </h2>

          <p className="text-[#B8C4D6] max-w-md mx-auto text-sm md:text-base font-light">
            Handpicked wisdom from the community curated just for you.
          </p>
        </div>

        {/* GRID / EMPTY STATE */}
        {!lessons || lessons.length === 0 ? (
          <div className="text-center py-16 border border-[#223753]/40 rounded-2xl bg-[#0D1B2A]/40 backdrop-blur-sm">
            <p className="text-[#7C8BA1] text-base">No featured lessons available right now.</p>
          </div>
        ) : (
          /* 🛠️ GRID LAYOUT FIXED HERE */
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-full mx-auto auto-rows-fr">
            {lessons.slice(0, 4).map((lesson) => (
              /* 🛠️ CARD CONTAINER FIXED FOR EXACT WIDTH */
              <div key={lesson._id} className="w-full flex">
                <LessonCard
                  lesson={lesson}
                  user={user}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}