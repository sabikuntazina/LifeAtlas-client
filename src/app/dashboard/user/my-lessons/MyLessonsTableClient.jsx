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
  FiUnlock
} from "react-icons/fi";

import { toast } from "react-toastify";
import { BiSolidLike } from "react-icons/bi";
import { IoSave } from "react-icons/io5";
import Link from "next/link";

export default function MyLessonsTableClient({ initialLessons = [], user }) {
  const [lessons, setLessons] = useState(initialLessons);
  const [loadingId, setLoadingId] = useState(null);

  const isPremiumUser = user?.plan === "premium";

  /* ---------------- VISIBILITY TOGGLE ---------------- */
  const handleVisibility = async (lesson) => {
    try {
      setLoadingId(lesson._id);

      const newVisibility =
        lesson.visibility === "public" ? "private" : "public";

      await updateVisibility(lesson._id, newVisibility);

      setLessons((prev = []) =>
        prev.map((l) =>
          l._id === lesson._id
            ? { ...l, visibility: newVisibility }
            : l
        )
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

      const newAccess =
        lesson.access === "free" ? "premium" : "free";

      await updateAccess(lesson._id, newAccess, user?.plan);

      setLessons((prev = []) =>
        prev.map((l) =>
          l._id === lesson._id
            ? { ...l, access: newAccess }
            : l
        )
      );

      toast.success("Access updated!");
    } catch (err) {
      toast.error("Failed to update access");
    } finally {
      setLoadingId(null);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this lesson?");
    if (!ok) return;

    try {
      setLoadingId(id);

      await deleteLesson(id);

      setLessons((prev = []) =>
        prev.filter((l) => l._id !== id)
      );

      toast.success("Lesson deleted!");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-[#07101c] to-[#0B1220] text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My Lessons <span className="text-blue-500">Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Manage, update and track your lessons
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <p className="text-sm text-gray-300">
            Total Lessons:{" "}
            <span className="text-white font-semibold">
              {lessons.length}
            </span>
          </p>

          <input
            placeholder="Search lesson..."
            className="px-3 py-2 text-sm bg-[#0B1220] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-6 py-4">Lesson</th>
                <th className="text-left px-6 py-4">Visibility</th>
                <th className="text-left px-6 py-4">Access</th>
                <th className="text-left px-6 py-4">Stats</th>
                <th className="text-left px-6 py-4">Created</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-white/5">

              {lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-white/5 transition"
                >

                  {/* TITLE */}
                  <td className="px-6 py-4">
                    <p className="font-semibold">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {lesson.category} • {lesson.tone}
                    </p>
                  </td>

                  {/* VISIBILITY */}
                  <td className="px-6 py-4">
                    <button
                      disabled={loadingId === lesson._id}
                      onClick={() => handleVisibility(lesson)}
                      className={`px-3 py-1 rounded-full text-xs border transition
                        ${lesson.visibility === "public"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                        }`}
                    >
                      {lesson.visibility === "public" ? (
                        <span className="flex items-center gap-1">
                          <FiEye /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <FiEyeOff /> Private
                        </span>
                      )}
                    </button>
                  </td>

                  {/* ACCESS */}
                  <td className="px-6 py-4">
                    <button
                      disabled={!isPremiumUser || loadingId === lesson._id}
                      onClick={() => handleAccess(lesson)}
                      className={`px-3 py-1 rounded-full text-xs border transition
                        ${lesson.access === "premium"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                    >
                      {lesson.access === "premium" ? (
                        <span className="flex items-center gap-1">
                          <FiLock /> Premium
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <FiUnlock /> Free
                        </span>
                      )}
                    </button>
                  </td>

                  {/* STATS */}
                  <td className="px-6 py-4 flex text-xs text-gray-300">
                    <span className="space-y-2">

                    <BiSolidLike className="mb-3"/> <p>{lesson.reactions || 0} </p> 
                    </span>
                    <span className="mx-2">|</span >
                    <span className="space-y-2">
                         <IoSave className="mb-3" /> <p>{lesson.saves || 0} </p> 
                    </span>
                   
                  </td>

                  {/* CREATED */}
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toDateString()
                      : "N/A"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          (window.location.href = `/dashboard/lesson/${lesson._id}`)
                        }
                        className="p-2 rounded-lg hover:bg-blue-500/20"
                      >
                        <FiInfo />
                      </button>

                      <Link
                      href={`/dashboard/user/my-lessons/${lesson._id}`}
                       
                        className="p-2 rounded-lg hover:bg-purple-500/20"
                      >
                        <FiEdit3 />
                      </Link>

                      <button
                        disabled={loadingId === lesson._id}
                        onClick={() => handleDelete(lesson._id)}
                        className="p-2 rounded-lg hover:bg-red-500/20"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}