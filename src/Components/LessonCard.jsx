'use client';

import Link from "next/link";
import { FiLock, FiCalendar, FiArrowRight, FiAward, FiSmile } from "react-icons/fi";

export default function LessonCard({ lesson, user }) {
  const isPremiumUser = user?.plan === "premium";

  // 🛠️ আপনার আগের লজিক ও প্রোপার্টি নেম ঠিক রাখা হয়েছে
  const isLocked = lesson.access === "premium" && !isPremiumUser;

  const createdDate = lesson.createdAt
    ? new Date(lesson.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Recent';

  return (
    <div className="group relative h-full rounded-2xl border border-[#223753]/60 bg-gradient-to-b from-[#11243A] to-[#081221] p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
      
      {/* ✨ BACKGROUND HOVER GLOW EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/5 to-[#3B82F6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 🔒 PREMIUM LOCK OVERLAY (INTEGRATED SMARTLY) */}
      {isLocked && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#081221]/85 backdrop-blur-md rounded-2xl text-center p-6 transition-all duration-300">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 text-[#3B82F6] shadow-inner shadow-blue-500/5 animate-pulse">
            <FiLock className="text-3xl" />
          </div>

          <h3 className="text-white font-bold text-base uppercase tracking-wider">
            Premium Lesson Locked
          </h3>

          <p className="text-xs text-[#B8C4D6] mt-2 max-w-[200px] leading-relaxed">
            Upgrade your membership matrix to unlock full community wisdom
          </p>

          <button
            onClick={() => (window.location.href = "/pricing")}
            className="mt-5 w-full max-w-[150px] py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#3B82F6] active:bg-[#1D4ED8] text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 transform active:scale-95"
          >
            Upgrade Plan
          </button>
        </div>
      )}

      {/* 📦 CARD CONTENT AREA */}
      <div className={`flex flex-col h-full ${isLocked ? "blur-[2px] select-none" : ""}`}>
        
        {/* HEADER BADGES */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#091524] border border-[#223753] text-[#3B82F6] uppercase tracking-wider">
            {lesson.category || 'General'}
          </span>
          
          {lesson.access === "premium" ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black rounded-lg bg-amber-400/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
              <FiAward size={12} className="animate-pulse" /> Premium
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Free
            </span>
          )}
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="space-y-2.5 flex-1">
          <h2 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] leading-snug line-clamp-2 transition-colors duration-300" title={lesson.title}>
            {lesson.title}
          </h2>

          <p className="text-sm text-[#B8C4D6] line-clamp-3 leading-relaxed font-light">
            {lesson.description}
          </p>
        </div>

        {/* TONE BADGE & CREATOR DETAILS */}
        <div className="mt-5 pt-4 border-t border-[#223753]/40 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Tone Badge */}
            {lesson.tone && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#152B45] text-[#B8C4D6] border border-[#223753] capitalize">
                <FiSmile size={12} className="text-pink-400" /> {lesson.tone} Tone
              </span>
            )}
            
            {/* Created Date */}
            <span className="flex items-center gap-1 text-[#7C8BA1] font-mono">
              <FiCalendar size={13} /> {createdDate}
            </span>
          </div>

          {/* User/Author Node */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-xs font-black text-white uppercase shadow-md shadow-blue-500/5">
              {lesson.userName?.[0] || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#7C8BA1]">Contributed by</span>
              <span className="text-xs font-bold text-[#F8FAFC] truncate max-w-[150px]">
                {lesson.userName || 'Anonymous'}
              </span>
            </div>
          </div>

        </div>

        {/* 🔘 ACTION BUTTON ALWAYS AT BOTTOM */}
        <div className="mt-5">
          <Link
            href={`/alllessons/${lesson._id}`}
            className="group/btn flex items-center justify-center gap-1 w-full rounded-xl bg-transparent border border-[#3B82F6]/30 hover:border-[#3B82F6] px-4 py-3 text-sm font-bold text-[#3B82F6] hover:text-white hover:bg-[#2563EB] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98]"
          >
            See Details
            <FiArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
}