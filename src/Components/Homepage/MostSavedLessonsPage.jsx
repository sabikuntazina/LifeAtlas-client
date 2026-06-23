import { getMostSavedLessons } from "@/lib/api/MostSavedLesson";
import MostSavedLessons from "./MostSavedLessons";

export default async function MostSavedLessonsPage() {
  const topSavedLessons = await getMostSavedLessons();

  return (
    // 🎯 ফিক্স: max-w-7xl করে ফুল স্পেস ওপেন করা হয়েছে
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <MostSavedLessons lessons={topSavedLessons} />
    </div>
  );
}