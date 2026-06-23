'use client';

import { motion } from 'framer-motion';
import { FiBookmark, FiUser, FiActivity, FiAward, FiZap } from 'react-icons/fi';

export default function MostSavedLessons({ lessons = [] }) {
  
  // গ্রিড কন্টেইনার স্ট্যাগার অ্যানিমেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  // কার্ডের পপ-ইন অ্যানিমেশন
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 14 } }
  };

  // মেডেল কনফিগারেশন
  const getRankConfig = (index) => {
    switch (index) {
      case 0:
        return {
          bg: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-[#081221]',
          border: 'border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]',
          glow: 'hover:border-yellow-500/50',
          medal: '🥇 1st'
        };
      case 1:
        return {
          bg: 'bg-gradient-to-br from-slate-200 via-slate-400 to-slate-500 text-[#081221]',
          border: 'border-slate-400/25 shadow-[0_0_15px_rgba(203,213,225,0.08)]',
          glow: 'hover:border-slate-400/40',
          medal: '🥈 2nd'
        };
      case 2:
        return {
          bg: 'bg-gradient-to-br from-amber-700 via-amber-800 to-orange-900 text-white',
          border: 'border-amber-700/25 shadow-[0_0_12px_rgba(180,83,9,0.08)]',
          glow: 'hover:border-amber-600/40',
          medal: '🥉 3rd'
        };
      default:
        return {
          bg: 'bg-[#081221] text-[#7C8BA1]',
          border: 'border-[#223753]',
          glow: 'hover:border-[#3B82F6]/30',
          medal: `#${index + 1}`
        };
    }
  };

  return (
    <div className="w-full py-4">
      
      {/* 👑 Section Title */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#223753]/40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#2563EB]/10 rounded-lg text-[#3B82F6] border border-[#2563EB]/20">
            <FiAward size={18} />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black tracking-wider text-[#F8FAFC] uppercase">
              Most Saved Wisdom
            </h2>
            <p className="text-xs text-[#7C8BA1] mt-0.5">Top bookmarked lessons by users</p>
          </div>
        </div>
      </div>

      {/* 🌌 ফিক্সড গ্রিড: অকারণ বড় না হয়ে ফুল উইডথ রেস্পনসিভ গ্রিড তৈরি করা হয়েছে */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4.5 w-full"
      >
        {lessons?.map((lesson, index) => {
          const rank = getRankConfig(index);
          return (
            <motion.div
              key={lesson._id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col justify-between p-4 bg-[#11243A]/30 backdrop-blur-xl border-2 ${rank.border} rounded-2xl shadow-xl ${rank.glow} transition-all duration-300 overflow-hidden`}
            >
              
              {/* Top Row: Rank & Category */}
              <div className="flex items-center justify-between mb-3.5">
                <span className={`px-2 py-0.5 rounded-md font-mono font-black text-[10px] tracking-wide uppercase ${rank.bg}`}>
                  {rank.medal}
                </span>
                <span className="text-[9px] font-black tracking-widest text-[#3B82F6] uppercase bg-[#2563EB]/5 px-2 py-0.5 rounded border border-[#3B82F6]/10">
                  {lesson.category}
                </span>
              </div>

              {/* Middle Section: Image Overlay & Content */}
              <div className="space-y-3 flex-1">
                
                {/* Image Wrap */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#223753] bg-[#0D1B2A]">
                  <img 
                    src={lesson.image || "https://i.ibb.co/F4rPBd1J/img6.jpg"} 
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {lesson.access === 'premium' && (
                    <span className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 font-black tracking-wider text-yellow-400 bg-[#081221]/90 backdrop-blur-md border border-yellow-400/30 rounded-md">
                      PRO
                    </span>
                  )}
                </div>

                {/* Lesson Meta Details */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#7C8BA1] flex items-center gap-1 font-semibold">
                    <FiActivity size={11} className="text-[#3B82F6]" /> {lesson.tone}
                  </span>
                  <h3 className="text-sm font-bold text-[#F8FAFC] tracking-wide leading-snug line-clamp-2 group-hover:text-[#3B82F6] transition-colors duration-200">
                    {lesson.title}
                  </h3>
                </div>

              </div>

              {/* Bottom Row: Separator, Author & Total Saves */}
              <div className="mt-4 pt-3 border-t border-[#223753]/50 flex items-center justify-between gap-2">
                
                {/* Author Info */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <FiUser size={11} className="text-[#7C8BA1] shrink-0" />
                  <p className="text-[11px] font-bold text-[#B8C4D6] truncate">
                    {lesson.creatorName}
                  </p>
                </div>

                {/* Counter Stats */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#081221]/60 border border-[#223753] group-hover:bg-[#2563EB]/5 group-hover:border-[#3B82F6]/30 transition-all duration-300 shrink-0">
                  <FiBookmark size={11} className="text-[#3B82F6] fill-[#3B82F6]/10" />
                  <span className="text-[11px] font-mono font-black text-[#F8FAFC]">
                    {lesson.saveCount || 0}
                  </span>
                </div>

              </div>

            </motion.div>
          );
        })}

        {/* Empty State */}
        {lessons.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#7C8BA1] border-2 border-dashed border-[#223753] rounded-2xl bg-[#11243A]/10 text-xs font-semibold">
            No saved data found yet.
          </div>
        )}
      </motion.div>
    </div>
  );
}