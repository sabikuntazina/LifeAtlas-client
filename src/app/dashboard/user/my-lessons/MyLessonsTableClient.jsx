'use client';

import { useState } from "react";
import {
  deleteLesson,
  updateAccess,
  updateVisibility
} from "@/lib/action/lessons";

import {
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiEdit3,
  FiInfo,
  FiLock,
  FiUnlock,
  FiSearch
} from "react-icons/fi";

import { toast } from "react-toastify";
import { BiSolidLike } from "react-icons/bi";
import { IoSave } from "react-icons/io5";
import Link from "next/link";
import DeleteLessonModal from "@/Components/DeleteLessonModal";

export default function MyLessonsTableClient({ initialLessons = [], user }) {
  const [lessons, setLessons] = useState(initialLessons);
  const [loadingId, setLoadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    lessonId: null,
    lessonTitle: "",
  });

  const isPremiumUser = user?.plan === "premium";

  // ক্লায়েন্ট সাইড সার্চ ফিল্টারিং 
  const filteredLessons = lessons.filter((lesson) =>
    lesson.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------------- VISIBILITY TOGGLE ---------------- */
  const handleVisibility = async (lesson) => {
    try {
      setLoadingId(lesson._id);
      const newVisibility = lesson.visibility === "public" ? "private" : "public";
      await updateVisibility(lesson._id, newVisibility);

      setLessons((prev = []) =>
        prev.map((l) => l._id === lesson._id ? { ...l, visibility: newVisibility } : l)
      );
      toast.success("Visibility updated!");
    } catch (err) {
      toast.error("Failed to update visibility");
    } finally {
      setLoadingId(null);
    }
  };

  /* ---------------- ACCESS TOGGLE ---------------- */
  const handleAccess = async (lesson) => {
    if (!isPremiumUser) {
      return toast.error("Premium feature only");
    }

    try {
      setLoadingId(lesson._id);
      const newAccess = lesson.access === "free" ? "premium" : "free";
      await updateAccess(lesson._id, newAccess, user?.plan);

      setLessons((prev = []) =>
        prev.map((l) => l._id === lesson._id ? { ...l, access: newAccess } : l)
      );
      toast.success("Access updated!");
    } catch (err) {
      toast.error("Failed to update access");
    } finally {
      setLoadingId(null);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    try {
      setLoadingId(deleteModal.lessonId);
      await deleteLesson(deleteModal.lessonId);

      setLessons((prev = []) => prev.filter((l) => l._id !== deleteModal.lessonId));
      toast.success("Lesson deleted!");
      setDeleteModal({ open: false, lessonId: null, lessonTitle: "" });
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[#081221] text-[#F8FAFC]">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          My Lessons <span className="text-[#3B82F6]">Dashboard</span>
        </h1>
        <p className="text-[#7C8BA1] mt-1 text-xs sm:text-sm">
          Manage, update and track your lessons seamlessly.
        </p>
      </div>

      {/* CONTROLS WRAPPER */}
      <div className="rounded-2xl border border-[#223753] bg-[#0D1B2A] overflow-hidden shadow-xl mb-6">
        
        {/* TOP BAR / SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-4 py-4 border-b border-[#223753]">
          <p className="text-xs sm:text-sm text-[#B8C4D6]">
            Total Lessons: <span className="text-white font-bold">{filteredLessons.length}</span>
          </p>

          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8BA1]" />
            <input
              type="text"
              placeholder="Search lesson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#081221] border border-[#223753] rounded-xl focus:outline-none focus:border-[#3B82F6] text-[#F8FAFC] placeholder-[#7C8BA1] transition-all"
            />
          </div>
        </div>

        {/* 📱 MOBILE VIEW: CARDS (Visible only on small screens) */}
        <div className="block lg:hidden divide-y divide-[#223753]/50">
          {filteredLessons.length === 0 ? (
            <div className="p-6 text-center text-[#7C8BA1] text-sm">No lessons found.</div>
          ) : (
            filteredLessons.map((lesson) => (
              <div key={lesson._id} className="p-4 bg-[#11243A]/40 space-y-4">
                
                {/* Title & Meta */}
                <div>
                  <h3 className="font-semibold text-base text-[#F8FAFC] line-clamp-1">{lesson.title}</h3>
                  <p className="text-xs text-[#7C8BA1] mt-0.5">
                    {lesson.category} • {lesson.tone}
                  </p>
                </div>

                {/* Badges & Stats Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  
                  {/* Status Badges */}
                  <div className="flex gap-2">
                    {/* Visibility */}
                    <button
                      disabled={loadingId === lesson._id}
                      onClick={() => handleVisibility(lesson)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                        lesson.visibility === "public"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}
                    >
                      {lesson.visibility === "public" ? <FiEye /> : <FiEyeOff />}
                      {lesson.visibility}
                    </button>

                    {/* Access */}
                    <button
                      disabled={!isPremiumUser || loadingId === lesson._id}
                      onClick={() => handleAccess(lesson)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                        lesson.access === "premium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {lesson.access === "premium" ? <FiLock /> : <FiUnlock />}
                      {lesson.access}
                    </button>
                  </div>

                  {/* Likes & Saves */}
                  <div className="flex items-center gap-3 text-xs text-[#B8C4D6] bg-[#081221] px-2.5 py-1 rounded-lg border border-[#223753]">
                    <span className="flex items-center gap-1">
                      <BiSolidLike className="text-blue-400" /> {lesson.likeCount || 0}
                    </span>
                    <span className="text-[#223753]">|</span>
                    <span className="flex items-center gap-1">
                      <IoSave className="text-purple-400" /> {lesson.saveCount || 0}
                    </span>
                  </div>

                </div>

                {/* Footer Actions & Date */}
                <div className="flex items-center justify-between pt-2 border-t border-[#223753]/30">
                  <span className="text-[11px] text-[#7C8BA1]">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "N/A"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/alllessons/${lesson._id}`}
                      className="p-2 text-[#B8C4D6] bg-[#081221] border border-[#223753] rounded-xl hover:bg-[#2563EB] hover:text-white transition-all"
                    >
                      <FiInfo size={15} />
                    </Link>

                    <Link
                      href={`/dashboard/user/my-lessons/${lesson._id}`}
                      className="p-2 text-[#B8C4D6] bg-[#081221] border border-[#223753] rounded-xl hover:bg-purple-600 hover:text-white transition-all"
                    >
                      <FiEdit3 size={15} />
                    </Link>

                    <button
                      disabled={loadingId === lesson._id}
                      onClick={() =>
                        setDeleteModal({
                          open: true,
                          lessonId: lesson._id,
                          lessonTitle: lesson.title,
                        })
                      }
                      className="p-2 text-red-400 bg-[#081221] border border-[#223753] rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* 💻 DESKTOP VIEW: FULL TABLE (Hidden on mobile/tablet) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            {/* HEAD */}
            <thead className="bg-[#11243A] text-[#B8C4D6] text-xs uppercase tracking-wider border-b border-[#223753]">
              <tr>
                <th className="px-6 py-4 font-semibold">Lesson</th>
                <th className="px-6 py-4 font-semibold">Visibility</th>
                <th className="px-6 py-4 font-semibold">Access</th>
                <th className="px-6 py-4 font-semibold text-center">Stats</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-[#223753]/40 bg-[#11243A]/10">
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-[#7C8BA1]">
                    No lessons found.
                  </td>
                </tr>
              ) : (
                filteredLessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-[#11243A]/40 transition-all group">
                    
                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors line-clamp-1">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-[#7C8BA1] mt-0.5">
                        {lesson.category} • {lesson.tone}
                      </p>
                    </td>

                    {/* VISIBILITY */}
                    <td className="px-6 py-4">
                      <button
                        disabled={loadingId === lesson._id}
                        onClick={() => handleVisibility(lesson)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          lesson.visibility === "public"
                            ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                            : "bg-gray-500/10 text-gray-300 border-gray-500/20 hover:bg-gray-500/20"
                        }`}
                      >
                        {lesson.visibility === "public" ? <FiEye /> : <FiEyeOff />}
                        <span className="capitalize">{lesson.visibility}</span>
                      </button>
                    </td>

                    {/* ACCESS */}
                    <td className="px-6 py-4">
                      <button
                        disabled={!isPremiumUser || loadingId === lesson._id}
                        onClick={() => handleAccess(lesson)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          lesson.access === "premium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20"
                        }`}
                      >
                        {lesson.access === "premium" ? <FiLock /> : <FiUnlock />}
                        <span className="capitalize">{lesson.access}</span>
                      </button>
                    </td>

                    {/* STATS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-xs text-[#B8C4D6]">
                        <span className="flex items-center gap-1" title="Likes">
                          <BiSolidLike className="text-blue-500 text-sm" /> {lesson.likeCount || 0}
                        </span>
                        <span className="text-[#223753]">|</span>
                        <span className="flex items-center gap-1" title="Saved count">
                          <IoSave className="text-purple-500 text-sm" /> {lesson.saveCount || 0}
                        </span>
                      </div>
                    </td>

                    {/* CREATED */}
                    <td className="px-6 py-4 text-xs text-[#B8C4D6]">
                      {lesson.createdAt ? new Date(lesson.createdAt).toDateString() : "N/A"}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/alllessons/${lesson._id}`}
                          className="p-2 rounded-xl text-[#B8C4D6] hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] border border-transparent hover:border-[#3B82F6]/30 transition-all"
                          title="View Details"
                        >
                          <FiInfo size={16} />
                        </Link>

                        <Link
                          href={`/dashboard/user/my-lessons/${lesson._id}`}
                          className="p-2 rounded-xl text-[#B8C4D6] hover:bg-purple-500/20 hover:text-purple-400 border border-transparent hover:border-purple-500/30 transition-all"
                          title="Edit Lesson"
                        >
                          <FiEdit3 size={16} />
                        </Link>

                        <button
                          disabled={loadingId === lesson._id}
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              lessonId: lesson._id,
                              lessonTitle: lesson.title,
                            })
                          }
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteLessonModal
        open={deleteModal.open}
        lessonTitle={deleteModal.lessonTitle}
        loading={loadingId === deleteModal.lessonId}
        onConfirm={handleDelete}
        onClose={() =>
          setDeleteModal({
            open: false,
            lessonId: null,
            lessonTitle: "",
          })
        }
      />
    </div>
  );
}