'use client'
import { FiLock } from "react-icons/fi";

export default function LessonCard({ lesson, user }) {
  const isPremiumUser = user?.plan === "premium";
  const isLocked =
    lesson.access === "premium" && !isPremiumUser;

  return (
    <div className="relative rounded-xl border border-white/10 bg-[#0B1220] shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* LOCK OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md rounded-xl text-center p-5">
          
          <FiLock className="text-4xl text-[#3B82F6] mb-3" />

          <p className="text-white font-semibold text-sm">
            Premium Lesson Locked
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Upgrade to unlock full wisdom
          </p>

          <button
            className="mt-4 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white text-sm font-medium transition"
            onClick={() => (window.location.href = "/pricing")}
          >
            Upgrade
          </button>
        </div>
      )}

      {/* CONTENT */}
      <div className={`p-5 ${isLocked ? "blur-sm select-none" : ""}`}>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-white leading-snug">
          {lesson.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mt-2 line-clamp-2">
          {lesson.description}
        </p>

        {/* META BADGES */}
        <div className="flex flex-wrap gap-2 mt-4">

          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
            {lesson.category}
          </span>

          <span className="px-2 py-1 text-xs rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
            {lesson.tone}
          </span>

          {lesson.access === "premium" ? (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
              Premium
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
              Free
            </span>
          )}

        </div>

        {/* CREATOR */}
        <div className="mt-3 text-xs text-gray-400">
          By <span className="text-white font-medium">{lesson.userName}</span>
        </div>

        <div className="text-xs text-gray-500">
          {new Date(lesson.createdAt).toDateString()}
        </div>

        {/* ACTION */}
        <button
          className="mt-4 w-full py-2 rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white text-sm font-medium transition"
          onClick={() =>
            (window.location.href = `/lessons/${lesson._id}`)
          }
        >
          See Details
        </button>

      </div>
    </div>
  );
}