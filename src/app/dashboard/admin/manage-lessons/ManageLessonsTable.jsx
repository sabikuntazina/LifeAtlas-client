"use client";

import React, { useState, useMemo } from 'react';
import { 
  FiCalendar, FiTrash2, FiStar, FiFilter, FiChevronDown, FiBookOpen, FiDollarSign 
} from 'react-icons/fi';
import { toast } from 'react-toastify';

// 🔌 Separate Components Import
import FeaturedModal from './FeaturedModal';
import DeleteModal from './DeleteModal';
import { postFeaturedLesson } from '@/lib/adminFunctions/featuredFunction';
import { deleteLesson } from '@/lib/action/lessons';

export default function ManageLessonsTable({ initialLessons }) {
  const [lessons, setLessons] = useState(initialLessons);
  
  // 🎯 State for handling which lesson is opened in modals
  const [selectedLessonToFeatured, setSelectedLessonToFeatured] = useState(null);
  const [selectedLessonToDelete, setSelectedLessonToDelete] = useState(null);
  
  // 🔍 Filter States (Flags Filter removed)
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [accessFilter, setAccessFilter] = useState('all');

  const categories = useMemo(() => {
    const allCats = initialLessons.map(l => l.category).filter(Boolean);
    return ['all', ...new Set(allCats)];
  }, [initialLessons]);

  // 🛠️ ফিল্টারিং লজিক (Flags বাদে)
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      // ১. ক্যাটাগরি ফিল্টার
      const matchCategory = categoryFilter === 'all' || lesson.category === categoryFilter;
      
      // ২. ভিজিবিলিটি ফিল্টার
      const currentVisibility = lesson.visibility || 'public'; 
      const matchVisibility = visibilityFilter === 'all' || currentVisibility === visibilityFilter;
      
      // ৩. এক্সেস ফিল্টার
      const currentAccess = lesson.access || 'free';
      const matchAccess = accessFilter === 'all' || currentAccess === accessFilter;

      return matchCategory && matchVisibility && matchAccess;
    });
  }, [lessons, categoryFilter, visibilityFilter, accessFilter]);

  // 🔥 Confirm Featured Function
  const handleConfirmFeatured = async () => {
    if (!selectedLessonToFeatured) return;
    
    const targetLesson = selectedLessonToFeatured; 
    const lessonId = targetLesson._id;
    const currentStatus = targetLesson.isFeatured || false;
    const newStatus = !currentStatus;

    setSelectedLessonToFeatured(null); 

    setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isFeatured: newStatus } : l));

    try {
      await postFeaturedLesson(targetLesson);
      toast.success(newStatus ? "✨ Lesson successfully marked as Featured!" : "Removed from Featured section.");
    } catch (error) {
      setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isFeatured: currentStatus } : l));
      toast.error("Failed to update featured status.");
    }
  };

  // 🗑️ Confirm Delete Function
  const handleDeleteLesson = async () => {
    if (!selectedLessonToDelete) return;
    const lessonId = selectedLessonToDelete._id;

    try {
      const responseData = await deleteLesson(lessonId);

      if (responseData && responseData.success === true) {
        setLessons(prev => prev.filter(l => l._id !== lessonId));
        toast.success("Lesson deleted successfully!");
      } else {
        toast.error(responseData?.message || "Failed to delete lesson.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error, please try again!");
    } finally {
      setSelectedLessonToDelete(null); 
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 🎛️ FILTERS CONTROL BAR (Grid adjusted to 3 columns) */}
      <div className="relative bg-gradient-to-r from-[#11243A] to-[#0E1E31] border border-[#223753]/80 p-6 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#2563EB] text-sm font-bold uppercase tracking-widest text-white px-5 py-2 rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <FiFilter size={14} /> Live Filters
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm text-[#94A3B8] font-bold uppercase tracking-wider block">Category Block</label>
            <div className="relative group">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none w-full bg-[#091524] border border-[#223753] text-base font-semibold text-[#CBD5E1] rounded-xl pl-4 pr-10 py-3.5 cursor-pointer outline-none transition-all duration-300 focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 capitalize group-hover:border-[#2E486D]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-[#0D1B2A] text-[#CBD5E1] py-2">{cat === 'all' ? '✨ All Categories' : cat}</option>
                ))}
              </select>
              <FiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-hover:text-[#94A3B8] transition-colors" />
            </div>
          </div>

          {/* Visibility Filter */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm text-[#94A3B8] font-bold uppercase tracking-wider block">Visibility Status</label>
            <div className="relative group">
              <select
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="appearance-none w-full bg-[#091524] border border-[#223753] text-base font-semibold text-[#CBD5E1] rounded-xl pl-4 pr-10 py-3.5 cursor-pointer outline-none transition-all duration-300 focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 group-hover:border-[#2E486D]"
              >
                <option value="all" className="bg-[#0D1B2A]">🌍 All Visibility</option>
                <option value="public" className="bg-[#0D1B2A] text-emerald-400">🟢 Public Only</option>
                <option value="private" className="bg-[#0D1B2A] text-amber-400">🟡 Private Only</option>
              </select>
              <FiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          </div>

          {/* Access Type Filter */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm text-[#94A3B8] font-bold uppercase tracking-wider block">Access Pricing</label>
            <div className="relative group">
              <select
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value)}
                className="appearance-none w-full bg-[#091524] border border-[#223753] text-base font-semibold text-[#CBD5E1] rounded-xl pl-4 pr-10 py-3.5 cursor-pointer outline-none transition-all duration-300 focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 group-hover:border-[#2E486D]"
              >
                <option value="all" className="bg-[#0D1B2A]">💎 All Access Types</option>
                <option value="free" className="bg-[#0D1B2A] text-cyan-400">🎁 Free Content</option>
                <option value="premium" className="bg-[#0D1B2A] text-yellow-400 font-bold">👑 Premium Content</option>
              </select>
              <FiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 📊 PREMIUM TABLE CONTAINER */}
      <div className="bg-gradient-to-b from-[#11243A] to-[#0C1A2B] border border-[#223753]/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-collapse">
            
            <thead>
              <tr className="border-b border-[#223753] bg-[#091524]/80 text-[#94A3B8] text-sm uppercase tracking-widest font-bold">
                <th className="py-5 pl-6 bg-transparent">Lesson Profile</th>
                <th className="py-5 bg-transparent">Access Type</th>
                <th className="py-5 bg-transparent">Category</th>
                <th className="py-5 bg-transparent">Visibility</th>
                <th className="py-5 bg-transparent text-center">Featured</th>
                <th className="py-5 pr-6 text-right bg-transparent">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#223753]/30 text-base text-slate-200">
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-24 text-[#64748B] text-lg font-medium bg-[#0E1E31]/20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <FiBookOpen size={40} className="text-[#223753]" />
                      <span>No lessons match your active matrix filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLessons.map((lesson) => {
                  const createdDate = lesson.createdAt 
                    ? new Date(lesson.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : 'N/A';

                  const isCurrentFeatured = lesson.isFeatured === true;

                  return (
                    <tr key={lesson._id} className="hover:bg-[#162D4A]/40 transition-all duration-300 group/row">
                      
                      {/* LESSON TITLE & IMAGE */}
                      <td className="py-5 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-2xl border-2 border-[#223753] group-hover/row:border-[#3B82F6]/50 overflow-hidden bg-[#091524] shrink-0 transition-colors duration-300 relative shadow-md">
                            {lesson.image ? (
                              <img src={lesson.image} alt={lesson.title} className="object-cover w-full h-full scale-100 group-hover/row:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1E3A8A]/20 to-[#0F172A] text-[#3B82F6] font-extrabold text-base">
                                DOC
                              </div>
                            )}
                          </div>
                          <div className="max-w-[220px] sm:max-w-[320px] space-y-2">
                            <div className="font-bold text-lg text-[#F1F5F9] truncate group-hover/row:text-white transition-colors" title={lesson.title}>
                              {lesson.title || 'Untitled Lesson'}
                            </div>
                            <div className="text-sm text-[#64748B] flex items-center gap-1.5 font-mono">
                              <FiCalendar size={14} className="text-[#475569]" /> {createdDate}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ACCESS TYPE */}
                      <td className="py-5">
                        {lesson.access === 'premium' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-xl px-3 py-1 uppercase tracking-wider shadow-md shadow-amber-500/5">
                            <FiDollarSign size={14} className="text-amber-400" /> Premium
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-xl px-3 py-1 uppercase tracking-wider">
                            Free
                          </span>
                        )}
                      </td>

                      {/* CATEGORY */}
                      <td className="py-5">
                        <span className="px-3 py-2 text-sm font-bold rounded-xl bg-[#091524] border border-[#223753] text-[#CBD5E1] uppercase tracking-wider shadow-sm">
                          {lesson.category || 'General'}
                        </span>
                      </td>

                      {/* VISIBILITY */}
                      <td className="py-5">
                        {lesson.visibility !== 'private' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Public
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Private
                          </span>
                        )}
                      </td>

                      {/* ⭐ FEATURED INTERACTIVE BUTTON */}
                      <td className="py-5 text-center">
                        <button
                          onClick={() => setSelectedLessonToFeatured(lesson)}
                          className={`p-3.5 rounded-xl border transition-all duration-300 active:scale-95 ${
                            isCurrentFeatured 
                              ? 'bg-gradient-to-br from-yellow-500/25 to-amber-500/10 text-amber-400 border-amber-500/50 shadow-lg shadow-amber-500/20' 
                              : 'bg-[#091524] text-[#475569] border-[#223753] hover:text-amber-400 hover:border-amber-500/30 hover:bg-[#0D1B2A]'
                          }`}
                        >
                          <FiStar size={20} fill={isCurrentFeatured ? "currentColor" : "none"} />
                        </button>
                      </td>

                      {/* 🗑️ DELETE INTERACTIVE BUTTON */}
                      <td className="py-5 pr-6 text-right">
                        <button
                          onClick={() => setSelectedLessonToDelete(lesson)}
                          className="p-3.5 rounded-xl bg-[#091524] border border-[#223753] text-[#64748B] hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 active:scale-95"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* 📦 MODAL COMPONENTS CALLING */}
      <FeaturedModal 
        lesson={selectedLessonToFeatured}
        onClose={() => setSelectedLessonToFeatured(null)}
        onConfirm={handleConfirmFeatured} 
      />

      <DeleteModal 
        lesson={selectedLessonToDelete}
        onClose={() => setSelectedLessonToDelete(null)}
        onConfirm={handleDeleteLesson}
      />

    </div>
  );
}