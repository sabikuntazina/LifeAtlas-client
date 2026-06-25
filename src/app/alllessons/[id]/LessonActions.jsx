"use client";

import { useState } from "react";
import { postComment, postLikedLessons, postSavedLessons } from "@/lib/action/SavedLessons";
import { FiBookmark, FiHeart, FiMessageCircle, FiUser, FiAlertTriangle, FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { postReportLesson } from "@/lib/adminFunctions/reportLesson";
import ReportLessonModal from "./ReportLessonModal";
import Link from "next/link"; 

export default function LessonActions({ id, lesson, user }) {
  // console.log("Latest lesson", lesson);
  
  const currentLesson = lesson || {};
  const lessonId = currentLesson._id || id;

  const getInitialLikeState = () => {
    if (currentLesson.isLiked) return true;
    if (typeof window !== "undefined" && user?.id && lessonId) {
      return localStorage.getItem(`liked_lesson_${user.id}_${lessonId}`) === "true";
    }
    return false;
  };


  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(currentLesson.isSaved || false); 
  const [saveCount, setSaveCount] = useState(currentLesson.saveCount || 0);

  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(getInitialLikeState); 
  const [likeCount, setLikeCount] = useState(currentLesson.likeCount || 0);

  const [commenting, setCommenting] = useState(false);
  const [commentCount, setCommentCount] = useState(currentLesson.commentCount || 0);
  const [commentText, setCommentText] = useState(""); 
  const [commentsList, setCommentsList] = useState(currentLesson.comments || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);


  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#081221] flex items-center justify-center text-[#B8C4D6]">
        <div className="text-center space-y-3">
          <span className="loading loading-spinner loading-md text-[#3B82F6]"></span>
          <p className="text-sm font-medium">Loading lesson modules...</p>
        </div>
      </div>
    );
  }

// REPORT HANDLERS
  const handleReportClick = () => {
    if (!user) return toast.info("Login required to report");
    setIsModalOpen(true); 
  };

  const handleConfirmReport = async (selectedReason) => {
    try {
      setIsReporting(true);
      
      const reportPayload = {
        ...currentLesson,
        reportReason: selectedReason, 
        reportedBy: user ? { id: user.id, name: user.name } : null 
      };

      await postReportLesson(reportPayload);
      toast.success("🚨 Report submitted successfully.");
      setIsModalOpen(false); 
    } catch (err) {
      toast.error("Something went wrong while reporting!");
    } finally {
      setIsReporting(false);
    }
  };

  // 🔄 TOGGLE SAVE FUNCTION
  const handleSaveLesson = async () => {
    if (!user) return toast.info("Login required");

    try {
      setSaving(true);
      const saveLessonData = {
        lessonId: lessonId, 
        title: currentLesson.title,
        userId: user.id,
        userName: user.name,
      };

      const result = await postSavedLessons(saveLessonData);

      if (result && result.isSaved !== undefined) {
        if (result.isSaved) {
          setSaved(true);
          setSaveCount((prev) => prev + 1);
          toast.success("Lesson saved successfully!");
        } else {
          setSaved(false);
          setSaveCount((prev) => Math.max(0, prev - 1)); 
          toast.success("Lesson removed from saves!");
        }
      }
    } catch (err) {
      console.error("Frontend Save Error:", err);
      toast.error("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  // 🔄 ❤️ TOGGLE LIKE/UNLIKE FUNCTION
  const handleLikedLesson = async () => {
    if (!user) return toast.info("Login required");

    const localLikeKey = `liked_lesson_${user.id}_${lessonId}`;

    try {
      setLiking(true);
      const likeLessonData = {
        lessonId: lessonId,
        userId: user.id,
        userName: user.name,
      };

      const result = await postLikedLessons(likeLessonData);
      
      if (result && result.isLiked !== undefined) {
        if (result.isLiked) {
          setLiked(true);
          setKeepLocalLike(localLikeKey, true);
          setLikeCount((prev) => prev + 1);
          toast.success("Lesson liked successfully!");
        } else {
          setLiked(false);
          setKeepLocalLike(localLikeKey, false);
          setLikeCount((prev) => Math.max(0, prev - 1)); 
          toast.success("Like removed!");
        }
      } else if (result && result.success === false) {
        toast.error(result.message || "Failed to update like status");
      }
    } catch (err) {
      console.error("Frontend Like Error:", err);
      toast.error("Something went wrong while toggling like!");
    } finally {
      setLiking(false);
    }
  };

  // LocalStorage Helper to avoid window check repeatedly
  const setKeepLocalLike = (key, value) => {
    if (typeof window !== "undefined") {
      if (value) localStorage.setItem(key, "true");
      else localStorage.removeItem(key);
    }
  };

  // COMMENT FUNCTION
  const handleComment = async () => {
    if (!user) return toast.info("Login required");
    if (!commentText.trim()) return toast.warning("Comment cannot be empty!"); 

    const newCommentLocal = {
      text: commentText,         
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(), 
    };

    try {
      setCommenting(true);
      const commentPayload = {
        lessonId: lessonId, 
        text: commentText,         
        userId: user.id,
        userName: user.name,
      };
      await postComment(commentPayload);
      setCommentsList((prev) => [newCommentLocal, ...prev]); 
      setCommentCount((prev) => prev + 1);
      setCommentText(""); 
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error("Something went wrong while commenting!");
    } finally {
      setCommenting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] px-4 py-12 md:py-20 antialiased">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* UPPER META BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#223753]">
          <div className="flex flex-wrap gap-2">
            {currentLesson.category && (
              <span className="badge bg-[#11243A] border-[#223753] text-[#B8C4D6] px-3 py-3 text-xs uppercase tracking-wider font-semibold">
                {currentLesson.category}
              </span>
            )}
            {currentLesson.tone && (
              <span className="badge bg-[#11243A] border-[#223753] text-[#7C8BA1] px-3 py-3 text-xs uppercase tracking-wider font-medium">
                Tone: {currentLesson.tone}
              </span>
            )}
            {currentLesson.access && (
              <span className={`badge px-3 py-3 text-xs uppercase tracking-wider font-bold border ${
                currentLesson.access === "premium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" : "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30"
              }`}>
                {currentLesson.access}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-[#7C8BA1] bg-[#0D1B2A] px-2 py-1 rounded border border-[#223753]">
              ID: {lessonId}
            </div>
            <button onClick={handleReportClick} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all">
              <FiAlertTriangle size={13} />
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 w-full aspect-[16/10] md:aspect-square relative rounded-2xl overflow-hidden border border-[#223753] bg-[#11243A] flex items-center justify-center">
            {currentLesson.image ? (
              <img src={currentLesson.image} alt={currentLesson.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#7C8BA1]">
                <span>📖</span>
                <p className="text-xs font-medium">No Preview Image</p>
              </div>
            )}
          </div>

          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
                {currentLesson.title || "Untitled Lesson"}
              </h1>
              <p className="text-[#7C8BA1] text-sm md:text-base leading-relaxed">
                A structured learning module designed to help you build core expertise step by step.
              </p>
            </div>

            {/* CREATOR INFO */}
            <div className="card bg-[#11243A] border border-[#223753] rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full ring-2 ring-[#3B82F6] overflow-hidden bg-[#0D1B2A]">
                    {currentLesson.creatorImg && <img src={currentLesson.creatorImg} alt="Instructor" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC]">{currentLesson.creatorName || "Anonymous"}</h3>
                    <p className="text-xs text-[#B8C4D6]">{currentLesson.creatorRole || "Instructor"}</p>
                  </div>
                </div>
                <Link href={`/alllessons/creatorProfile/${currentLesson.creatorId || ''}`} className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#2563EB] hover:bg-[#3B82F6] text-white px-3.5 py-2 rounded-xl transition-all shadow-md">
                  <span>View Profile</span>
                  <FiArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT BOX */}
        <div className="card bg-[#11243A] border border-[#223753] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]"></div>
          <div className="card-body p-6 md:p-10">
            <p className="text-[#B8C4D6] leading-relaxed whitespace-pre-line">{currentLesson.description || "No description available."}</p>
          </div>
        </div>

        {/* INTERACTIVE ENGAGEMENT BAR */}
        <div className="card bg-[#152B45] border border-[#223753] rounded-xl shadow-md">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#223753]/60 pb-3">
              <p className="text-xs font-semibold text-[#B8C4D6] tracking-wide uppercase">Interactive Hub</p>
              
              <div className="flex gap-3">
                {/* SAVE BUTTON */}
                <button
                  onClick={handleSaveLesson}
                  disabled={saving}
                  className={`btn btn-xs sm:btn-sm border-[#223753] rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                    saved 
                      ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]" 
                      : "bg-[#11243A] text-[#B8C4D6] hover:bg-[#152B45]"
                  }`}
                >
                  <FiBookmark size={14} className={saved ? "fill-current" : ""} />
                  <span>{saving ? "Processing..." : saved ? `Saved (${saveCount})` : `Save (${saveCount})`}</span>
                </button>

                {/* ❤️ INTERACTIVE LIKE BUTTON */}
                <button
                  onClick={handleLikedLesson}
                  disabled={liking}
                  className={`btn btn-xs sm:btn-sm rounded-lg transition-all font-medium flex items-center gap-1.5 border ${
                    liked 
                      ? "bg-red-500/10 text-red-500 border-red-500/40 hover:bg-red-500/20" 
                      : "bg-[#11243A] text-[#B8C4D6] border-[#223753] hover:bg-[#152B45]"
                  }`}
                >
                  <FiHeart 
                    size={14} 
                    className={`transition-colors ${liked ? "fill-red-500 text-red-500" : "text-[#7C8BA1]"}`} 
                  />
                  <span>{liking ? "Processing..." : liked ? `Liked (${likeCount})` : `Like (${likeCount})`}</span>
                </button>
              </div>
            </div>

            {/* COMMENT INPUT */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#7C8BA1]"><FiMessageCircle size={16} /></span>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={user ? "Write a public comment..." : "Please login to comment..."}
                  disabled={!user || commenting}
                  className="w-full bg-[#11243A] border border-[#223753] rounded-lg py-2 pl-10 pr-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <button onClick={handleComment} disabled={commenting || !commentText.trim()} className="btn btn-sm bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs rounded-lg px-6 h-[38px] w-full sm:w-auto">
                Comment ({commentCount})
              </button>
            </div>
          </div>
        </div>

        {/* COMMENTS LIST */}
        <div className="card bg-[#11243A] border border-[#223753] rounded-xl shadow-xl">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-[#223753] pb-3">
              <FiMessageCircle className="text-[#3B82F6]" /> Discussion ({commentCount})
            </h3>
            {commentsList.length === 0 ? (
              <p className="text-sm text-[#7C8BA1] py-4 text-center">No comments yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {commentsList.map((comm, index) => (
                  <div key={index} className="flex gap-3 bg-[#081221]/50 border border-[#223753]/40 p-4 rounded-xl">
                    <div className="avatar placeholder shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#152B45] flex items-center justify-center">
                        {comm.userImage ? <img src={comm.userImage} alt={comm.userName} className="object-cover w-full h-full rounded-full" /> : <FiUser className="text-[#7C8BA1]" />}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F8FAFC]">{comm.userName || "Anonymous"}</span>
                        <span className="text-[11px] text-[#7C8BA1]">{comm.createdAt ? new Date(comm.createdAt).toLocaleDateString() : "Just Now"}</span>
                      </div>
                      <p className="text-sm text-[#B8C4D6] whitespace-pre-wrap">{comm.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <ReportLessonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmReport} isReporting={isReporting} />
    </div>
  );
}