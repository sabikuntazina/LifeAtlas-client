import { postSavedLessons } from "@/lib/action/SavedLessons";
import { getLessonPubliclyById } from "@/lib/api/getAllLessons";
import { getServerSession } from "@/lib/core/session";
import React from "react";
import { FiBookmark, FiHeart, FiMessageCircle } from "react-icons/fi";
import LessonActions from "./LessonActions";

const LessonDetailsPage = async ({ params }) => {

  const { id } = await params;
  const user= await getServerSession();

  const lesson = await getLessonPubliclyById(id);
  // console.log(lesson);

 
  
    

  

  // NOT FOUND STATE
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081221] text-[#F8FAFC] px-4">
        <div className="card w-full max-w-sm bg-[#11243A] border border-[#223753] shadow-2xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error font-bold">Lesson Not Found</h2>
            <p className="text-[#7C8BA1] text-sm">The requested lesson could not be retrieved or does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Safe Date Formatting with Fallback
  let formattedDate = "Recently";
  if (lesson.createdAt) {
    const dateObj = new Date(lesson.createdAt);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

 return (
  <LessonActions id={id} lesson={lesson} user={user}></LessonActions>
  );
};

export default LessonDetailsPage;