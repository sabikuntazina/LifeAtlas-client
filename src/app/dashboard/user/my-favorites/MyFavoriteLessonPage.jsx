"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { FiEye, FiTrash2, FiFilter, FiFolder } from "react-icons/fi";
import { toast } from "react-toastify";

export default function MyFavoriteLessonsTable({ initialLessons, favoriteData }) {
  const [lessons, setLessons] = useState(initialLessons || []);
  const [selectedCategory, setSelectedCategory] = useState("all");


  const categories = useMemo(() => {
    const list = new Set(lessons.map((l) => l?.category || l?.tone).filter(Boolean));
    return ["all", ...Array.from(list)];
  }, [lessons]);


  const filteredLessons = useMemo(() => {
    if (selectedCategory === "all") return lessons;
    return lessons.filter((l) => l?.category === selectedCategory || l?.tone === selectedCategory);
  }, [selectedCategory, lessons]);


  const handleRemove = async (lessonId) => {
    const favoriteItem = favoriteData.find((item) => item.lessonId === lessonId);
    const savedId = favoriteItem?._id || favoriteItem?.id;

    if (!savedId) {
      toast.error("Could not find favorite record ID");
      return;
    }

    try {
      // আপনার ডিলিট এপিআই কল করার জায়গা এটি
      setLessons((prev) => prev.filter((l) => (l._id || l.id) !== lessonId));
      toast.success("Lesson removed from favorites!");
    } catch (err) {
      toast.error("Failed to remove lesson");
    }
  };

  return (
    <div className="space-y-6 antialiased">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D1B2A]/80 backdrop-blur-md p-5 rounded-2xl border border-[#223753]/60 shadow-lg">
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">Saved Lessons</h2>
          <p className="text-xs text-[#8CA0B8] mt-0.5">
            Showing {filteredLessons.length} of {lessons.length} total items
          </p>
        </div>

        <div className="relative w-full sm:w-auto flex items-center">
          <div className="absolute left-4 text-[#8CA0B8] pointer-events-none">
            <FiFilter size={16} />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-56 pl-10 pr-4 py-2.5 bg-[#11243A] border border-[#223753] text-white rounded-xl text-xs font-medium focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] cursor-pointer transition-all appearance-none capitalize shadow-inner"
          >
            <option value="all">All Categories / Tones</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} >
                {cat}
              </option>
            ))}
          </select>
          {/* Custom Arrow for select */}
          <div className="absolute right-4 pointer-events-none text-[#8CA0B8] text-xs">▼</div>
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#0D1B2A]/50 rounded-2xl border border-[#223753]/40 backdrop-blur-sm">
          <div className="p-4 bg-[#11243A] rounded-full border border-[#223753] text-[#8CA0B8] mb-4">
            <FiFolder size={28} />
          </div>
          <h3 className="text-white font-medium text-sm">No bookmarks found</h3>
          <p className="text-[#8CA0B8] text-xs mt-1 max-w-xs">
            Try resetting your category filter or explore more lessons to add them here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full bg-[#0D1B2A]/90 rounded-2xl border border-[#223753]/50 shadow-2xl backdrop-blur-md">
          <table className="table w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead className="bg-[#11243A]/80 text-[#8CA0B8] border-b border-[#223753]/60 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="p-4 pl-6 font-semibold">Lesson Details</th>
                <th className="p-4 font-semibold">Category / Mood</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#223753]/40 text-xs text-white/90">
              {filteredLessons.map((lesson, index) => { // 👈 এখানে index প্যারামিটার যোগ করা হয়েছে
                if (!lesson) return null;
                
                // আইডি জেনারেট করার সেফ লজিক (প্রথমে _id, তারপর id, না থাকলে index)
                const currentKey = lesson._id || lesson.id || `lesson-fallback-${index}`;

                return (
                  <tr key={currentKey} className="hover:bg-[#11243A]/30 transition-all duration-200">
                    
                    {/* লেসন টাইটেল ও ডেসক্রিপশন */}
                    <td className="p-4 pl-6 max-w-xs sm:max-w-sm md:max-w-md">
                      <div className="font-semibold text-sm text-white/95 truncate tracking-wide hover:text-[#3B82F6] transition-colors">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-[#8CA0B8] truncate mt-1 font-normal opacity-85">
                        {lesson.description || "No description available for this lesson."}
                      </div>
                    </td>

                    {/* মডার্ন ডট ব্যাজ ডিজাইন */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 capitalize">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        {lesson.category || lesson.tone || "General"}
                      </span>
                    </td>

                    {/* ডিউরেশন */}
                    <td className="p-4 text-[#8CA0B8] font-medium">
                      {lesson.duration || "—"} mins
                    </td>

                    {/* প্রফেশনাল অ্যাকশন আইকন বাটন */}
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        
                        {/* View Button */}
                        <Link
                          href={`/alllessons/${lesson._id || lesson.id}`}
                          className="w-9 h-9 flex items-center justify-center bg-[#11243A] hover:bg-[#1C3554] border border-[#223753] text-[#8CA0B8] hover:text-[#3B82F6] hover:border-[#3B82F6]/60 rounded-xl transition-all shadow-sm tooltip"
                          data-tip="View Details"
                        >
                          <FiEye size={15} />
                        </Link>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(lesson._id || lesson.id)}
                          className="w-9 h-9 flex items-center justify-center bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/15 hover:border-transparent rounded-xl transition-all shadow-sm cursor-pointer"
                          title="Remove from favorites"
                        >
                          <FiTrash2 size={15} />
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}