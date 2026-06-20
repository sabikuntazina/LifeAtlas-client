"use client";

import { useState } from "react";
import { postComment, postLikedLessons, postSavedLessons } from "@/lib/action/SavedLessons";
import { FiBookmark, FiHeart, FiMessageCircle, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function LessonActions({ id, lesson, user }) {
  console.log("Latest lesson", lesson);
  
  const [saving, setSaving] = useState(false);
  const [saveCount, setSaveCount] = useState(lesson.saveCount || 0);

  // Like States
  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(lesson.likeCount || 0);

  // Comment States
  const [commenting, setCommenting] = useState(false);
  const [commentCount, setCommentCount] = useState(lesson.commentCount || 0);
  const [commentText, setCommentText] = useState(""); 
  // ✅ কমেন্ট লাইভ দেখানোর জন্য স্টেট (ডাটাবেজ থেকে আসা comments array অথবা খালি array)
  const [commentsList, setCommentsList] = useState(lesson.comments || []);

  const formattedDate = lesson.createdAt
    ? new Date(lesson.createdAt).toLocaleDateString()
    : "Just Now";

// 📥 SAVE LESSON FUNCTION
const handleSaveLesson = async () => {
  if (!user) return alert("Login required");

  try {
    setSaving(true);
    
    const saveLessonData = {
      lessonId: lesson._id || id, 
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      userRole: user.role,
      userPlan: user.plan,
      userEmail: user.email,
    };

    const result = await postSavedLessons(saveLessonData);

    if (result && result.success === false) {
      return toast.error(result.message || "Could not save lesson!");
    }

    setSaveCount((prev) => prev + 1);
    toast.success("Lesson saved successfully!");
  } catch (err) {
    console.error("Frontend Save Error:", err);
    toast.error("Something went wrong!");
  } finally {
    setSaving(false);
  }
};

 // ❤️ LIKE LESSON FUNCTION
const handleLikedLesson = async () => {
  if (!user) return alert("Login required");
  if (liked) return toast.info("Already liked this lesson!");

  try {
    setLiking(true);

    const likeLessonData = {
      lessonId: lesson._id || id, 
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      userRole: user.role,
      userPlan: user.plan,
      userEmail: user.email,
    };

    await postLikedLessons(likeLessonData);
    
    // UI-তে লাইক সংখ্যা সাথে সাথে ১ বাড়িয়ে দেওয়া
    setLikeCount((prev) => prev + 1);
    setLiked(true);
    toast.success("Lesson liked successfully!");
  } catch (err) {
    console.error("Frontend Like Error:", err);
    toast.error("Something went wrong while liking!");
  } finally {
    setLiking(false);
  }
};
  // 💬 COMMENT LESSON FUNCTION
  const handleComment = async () => {
    if (!user) return alert("Login required");
    if (!commentText.trim()) return toast.warning("Comment cannot be empty!"); 

   
    const newCommentLocal = {
      text: commentText,         
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      userRole: user.role,
      userPlan: user.plan,
      userEmail: user.email,
      createdAt: new Date().toISOString(), 
    };

    try {
      setCommenting(true);

      const commentPayload = {
        lessonId: lesson._id || id, 
        text: commentText,         
        userId: user.id,
        userName: user.name,
        userImage: user.image,
        userRole: user.role,
        userPlan: user.plan,
        userEmail: user.email,
      };


      await postComment(commentPayload);

      // ✅ UI আপডেট: স্টেট আপডেট করে নতুন কমেন্টটি অ্যারের সবার উপরে (বা নিচে) যোগ করা
      setCommentsList((prev) => [newCommentLocal, ...prev]); 
      setCommentCount((prev) => prev + 1);
      setCommentText(""); // ইনপুট বক্স ক্লিয়ার
      toast.success("Comment added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while commenting!");
    } finally {
      setCommenting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] px-4 py-12 md:py-20 antialiased selection:bg-[#3B82F6]/30">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* UPPER META BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#223753]">
          <div className="flex flex-wrap gap-2">
            {lesson.category && (
              <span className="badge bg-[#11243A] border-[#223753] text-[#B8C4D6] px-3 py-3 text-xs uppercase tracking-wider font-semibold">
                {lesson.category}
              </span>
            )}
            {lesson.tone && (
              <span className="badge bg-[#11243A] border-[#223753] text-[#7C8BA1] px-3 py-3 text-xs uppercase tracking-wider font-medium">
                Tone: {lesson.tone}
              </span>
            )}
            {lesson.access && (
              <span
                className={`badge px-3 py-3 text-xs uppercase tracking-wider font-bold border ${
                  lesson.access === "premium"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                    : "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30"
                }`}
              >
                {lesson.access}
              </span>
            )}
          </div>
          <div className="text-xs font-mono text-[#7C8BA1] bg-[#0D1B2A] px-2 py-1 rounded border border-[#223753]">
            ID: {lesson._id || id}
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 w-full aspect-[16/10] md:aspect-square relative rounded-2xl overflow-hidden border border-[#223753] bg-[#11243A] shadow-xl group flex items-center justify-center">
            {lesson.image ? (
              <img
                src={lesson.image}
                alt={lesson.title || "Lesson Thumbnail"}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#7C8BA1]">
                <span className="text-3xl">📖</span>
                <p className="text-xs font-medium">No Preview Image</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081221]/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-tight">
                {lesson.title || "Untitled Lesson"}
              </h1>
              <p className="text-[#7C8BA1] text-sm md:text-base leading-relaxed max-w-2xl">
                A structured learning module designed to help you build core
                expertise step by step with clarity and executive focus.
              </p>
            </div>

            {/* CREATOR INFO BLOCK */}
            <div className="card bg-[#11243A] border border-[#223753] rounded-xl shadow-md p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="avatar placeholder">
                    <div className="w-14 h-14 rounded-full ring-2 ring-[#3B82F6] ring-offset-4 ring-offset-[#11243A] overflow-hidden bg-[#0D1B2A] relative flex items-center justify-center">
                      {lesson.creatorImg ? (
                        <img
                          src={lesson.creatorImg}
                          alt={lesson.creatorName || "Instructor"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-white uppercase">
                          {lesson.creatorName?.charAt(0) || "I"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#F8FAFC] tracking-wide">
                        {lesson.creatorName || "Anonymous Instructor"}
                      </h3>
                      {lesson.creatorPlan === "premium" && (
                        <span className="badge badge-xs bg-[#3B82F6] border-none text-white font-extrabold uppercase px-1.5 py-1 text-[9px]">
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#B8C4D6] font-medium mt-0.5">
                      {lesson.creatorRole || "Instructor"}
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-[11px] uppercase tracking-wider text-[#7C8BA1] font-medium">
                    Published
                  </p>
                  <p className="text-xs font-semibold text-[#B8C4D6] mt-0.5">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT BOX */}
        <div className="card bg-[#11243A] border border-[#223753] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]"></div>
          <div className="card-body p-6 md:p-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-[13px] text-[#3B82F6]">
              Lesson Overview & Insights
            </h2>
            <p className="text-[#B8C4D6] leading-relaxed text-base md:text-lg whitespace-pre-line">
              {lesson.description ||
                "No description available for this lesson."}
            </p>
          </div>
        </div>

        {/* INTERACTIVE ACTION ENGAGEMENT BAR (Input & Action) */}
        <div className="card bg-[#152B45] border border-[#223753] rounded-xl shadow-md">
          <div className="p-4 space-y-4">
            
            {/* TOP ACTIONS ROW */}
            <div className="flex items-center justify-between border-b border-[#223753]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
                <p className="text-xs font-semibold text-[#B8C4D6] tracking-wide uppercase text-[11px]">
                  Interactive Hub ({saveCount} Saves)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveLesson}
                  disabled={saving}
                  className="btn btn-xs border-[#223753] bg-[#11243A] hover:bg-[#152B45] text-[#B8C4D6] rounded-md transition-all"
                >
                  {saving ? "Saving..." : `Saved (${saveCount})`}
                </button>

                <button
                  onClick={handleLikedLesson}
                  disabled={liking}
                  className={`btn btn-xs border-[#223753] rounded-md transition-all ${
                    liked ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-[#11243A] text-[#B8C4D6]"
                  }`}
                >
                  {liking ? "Liking..." : liked ? `Liked (${likeCount})` : `Like (${likeCount})`}
                </button>
              </div>
            </div>

            {/* COMMENT INPUT & BUTTON FIELD */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#7C8BA1]">
                  <FiMessageCircle size={16} />
                </span>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={user ? "Write a public comment..." : "Please login to comment..."}
                  disabled={!user || commenting}
                  className="w-full bg-[#11243A] border border-[#223753] rounded-lg py-2 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder-[#7C8BA1] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all disabled:opacity-50"
                />
              </div>

              <button
                onClick={handleComment}
                disabled={commenting || !commentText.trim()}
                className="btn btn-sm border-none bg-[#2563EB] hover:bg-[#3B82F6] active:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide transition-all rounded-lg shadow-lg px-6 py-3 h-[38px] sm:h-auto disabled:opacity-40"
              >
                {commenting ? "Commenting..." : `Comment (${commentCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ NEW: COMMENTS DISPLAY LIST SECTION */}
        <div className="card bg-[#11243A] border border-[#223753] rounded-xl shadow-xl">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-[#223753] pb-3">
              <FiMessageCircle className="text-[#3B82F6]" />
              Discussion ({commentCount})
            </h3>

            {commentsList.length === 0 ? (
              <p className="text-sm text-[#7C8BA1] py-4 text-center">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#223753]">
                {commentsList.map((comm, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 bg-[#081221]/50 border border-[#223753]/40 p-4 rounded-xl transition-all hover:border-[#223753]"
                  >
                    {/* User Avatar */}
                    <div className="avatar placeholder shrink-0">
                      <div className="w-10 h-10 rounded-full ring-1 ring-[#3B82F6]/40 overflow-hidden bg-[#152B45] flex items-center justify-center">
                        {comm.userImage ? (
                          <img src={comm.userImage} alt={comm.userName} className="object-cover w-full h-full" />
                        ) : (
                          <FiUser className="text-[#7C8BA1]" />
                        )}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-x-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#F8FAFC]">{comm.userName || "Anonymous"}</span>
                          {comm.userPlan === "premium" && (
                            <span className="bg-[#3B82F6]/20 text-[#3B82F6] text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">PRO</span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#7C8BA1]">
                          {comm.createdAt ? new Date(comm.createdAt).toLocaleDateString() : "Just Now"}
                        </span>
                      </div>
                      <p className="text-sm text-[#B8C4D6] leading-relaxed whitespace-pre-wrap">{comm.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}