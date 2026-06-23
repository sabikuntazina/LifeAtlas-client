import { getMostSavedLessons } from "@/lib/api/MostSavedLesson";
import MostSavedLessons from "./MostSavedLessons";

export default async function MostSavedLessonsPage() {
  const topSavedLessons = await getMostSavedLessons();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <MostSavedLessons lessons={topSavedLessons} />
    </div>
  );
}