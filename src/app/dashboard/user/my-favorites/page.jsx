import MyFavoriteLessonTable from '@/Components/MyFavoriteLessonTable';
import { getFavoriteLessons } from '@/lib/api/favoriteLesson';
import { getLessonById } from '@/lib/api/getAllLessons';
import { getServerSession } from '@/lib/core/session';


const MyFavoriteLessonPage = async () => {
  const user = await getServerSession();

  if (!user?.id) {
    return (
      <div className="min-h-screen bg-[#081221] text-white flex items-center justify-center p-4">
        <div className="p-6 bg-[#0D1B2A] border border-red-500/20 rounded-2xl text-center max-w-sm">
          <p className="text-red-400 font-medium">Access Denied</p>
          <p className="text-xs text-[#8CA0B8] mt-1">Please log in to your account to view saved favorites.</p>
        </div>
      </div>
    );
  }


  const favoriteData = await getFavoriteLessons(user.id);
  

  let detailedLessons = [];
  if (favoriteData && favoriteData.length > 0) {
    detailedLessons = await Promise.all(
      favoriteData.map(async (item) => {
        try {
          const lessonDetails = await getLessonById(item.lessonId);
          return lessonDetails;
        } catch (err) {
          console.error(`Error fetching lesson ${item.lessonId}:`, err);
          return null;
        }
      })
    );

    detailedLessons = detailedLessons.filter(Boolean);
  }

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-8 md:py-12 selection:bg-[#3B82F6]/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* টপ হেডার সেকশন */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            My <span className="text-[#3B82F6]">Favorites</span>
          </h1>
          <p className="text-[#8CA0B8] text-sm">
            Access and manage all your bookmarked and curated learning lessons.
          </p>
        </div>

<MyFavoriteLessonTable initialLessons={detailedLessons} 
          favoriteData={favoriteData} ></MyFavoriteLessonTable>
  {/* <MyFavoriteLessonPage
          initialLessons={detailedLessons} 
          favoriteData={favoriteData} 
        />       */}
        
      </div>
    </div>
  );
};

export default MyFavoriteLessonPage;