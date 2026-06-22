"use client";

import Link from 'next/link';
import React from 'react';
import { FiAward, FiCompass, FiShield, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

export default function WhyLearningFromLife() {
  
  // 💎 4 Benefit Cards Data Array
  const benefits = [
    {
      id: 1,
      icon: <FiAward className="text-[#3B82F6]" size={28} />,
      title: "Preserve Invisible Wealth",
      description: "Daily experiences and raw life moments hold unique insights. Documenting them turns transient thoughts into a timeless asset of personal wisdom."
    },
    {
      id: 2,
      icon: <FiCompass className="text-emerald-400" size={28} />,
      title: "Accelerated Self-Growth",
      description: "Reviewing your past challenges and cognitive breakthrough patterns provides a clear compass for making better, smarter future decisions."
    },
    {
      id: 3,
      icon: <FiShield className="text-amber-400" size={28} />,
      title: "Mental Clarity & Focus",
      description: "Transferring deep life reflections out of your head and into a structured digital workspace reduces cognitive load and sharpens daily focus."
    },
    {
      id: 4,
      icon: <FiTrendingUp className="text-pink-400" size={28} />,
      title: "Legacy & Shared Wisdom",
      description: "Your structured lifelog isn't just for you. It builds a foundational blueprint of concepts that can guide, inspire, and mentor the next generation."
    }
  ];

  return (
    <section className="bg-[#081221] text-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* 🌌 Subtle Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* 📢 SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1B2A] border border-[#223753] text-xs font-mono font-bold uppercase tracking-widest text-[#3B82F6]">
            ● Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Why Learning From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-cyan-400">Life Matters</span>
          </h2>
          <p className="text-base sm:text-lg text-[#B8C4D6] font-medium leading-relaxed">
            The ultimate human edge is not just acquiring generic data—it is decoding your unique journey. 
            Here is why converting real-life metrics into personal lessons is non-negotiable.
          </p>
        </div>

        {/* 🎛️ 4 BENEFIT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="group bg-[#11243A] border border-[#223753] hover:border-[#3B82F6]/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2563EB]/5"
            >
              <div className="space-y-4">
                {/* Icon Shell */}
                <div className="w-14 h-14 rounded-xl bg-[#0B1725] border border-[#223753] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-[#B8C4D6] leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-6 pt-4 border-t border-[#223753]/40 flex items-center justify-between text-xs font-mono text-[#7C8BA1] group-hover:text-[#3B82F6] transition-colors">
                <span>0{benefit.id}  Wisdom Node</span>
                <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* 🛠️ BOTTOM CTA TRIVIA BANNER (Optional/Clean design addition) */}
        <div className="bg-gradient-to-r from-[#0D1B2A] to-[#11243A] border border-[#223753] rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#F8FAFC]">Ready to document your first life breakthrough?</h4>
            <p className="text-xs sm:text-sm text-[#7C8BA1]">Do not let valuable micro-insights fade away into random thoughts.</p>
          </div>
          <Link href={'/alllessons'} className="btn bg-[#2563EB] hover:bg-[#3B82F6] active:bg-[#1D4ED8] text-white border-none px-6 rounded-xl font-bold font-sans tracking-wide transition-all shadow-lg shadow-blue-600/20 group">
            Explore Lessons
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}