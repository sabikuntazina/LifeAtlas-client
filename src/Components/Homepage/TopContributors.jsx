"use client";

import React, { useState, useEffect } from "react";
import { FiAward, FiBookOpen, FiUser, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { authHeader } from "@/lib/core/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function TopContributors() {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/lessons/top-contributors`, {
          method: "GET",

          headers: await authHeader(),
        });
        const data = await res.json();
        console.log("Top:", data);
        if (data.success && data.data && data.data.length > 0) {
          setContributors(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch top contributors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopContributors();
  }, []);

  return (
    <section className="bg-[#081221] text-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 🌌 Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* 📢 সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#223753]/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1B2A] border border-[#223753] text-[11px] font-mono font-bold uppercase tracking-widest text-[#3B82F6] mb-3">
              🏆 Community Leaderboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Top{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-cyan-400">
                Contributors
              </span>
            </h2>
            <p className="text-sm text-[#B8C4D6] mt-1">
              Shining a spotlight on minds sharing the most valuable
              life-lessons and micro-insights.
            </p>
          </div>
          <Link
            href="/alllessons"
            className="text-xs font-mono font-bold text-[#3B82F6] hover:underline flex items-center gap-1 shrink-0 group"
          >
            Browse All Knowledge{" "}
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 👥 কন্ট্রিবিউটর গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {isLoading ? (
            // 🔄 Skeleton Loader
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-[#11243A]/50 border border-[#223753]/40 p-5 rounded-2xl flex flex-col items-center space-y-4 animate-pulse"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0B1725]"></div>
                <div className="h-4 bg-[#0B1725] w-24 rounded"></div>
                <div className="h-3 bg-[#0B1725] w-16 rounded"></div>
              </div>
            ))
          ) : contributors.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#7C8BA1] text-sm font-mono uppercase tracking-wider">
              ✦ Matrix Leaderboard is currently resting ✦
            </div>
          ) : (
            contributors.map((user, index) => {
              const medalColors = [
                "bg-amber-400 text-slate-900 shadow-amber-500/20",
                "bg-slate-300 text-slate-900 shadow-slate-400/20",
                "bg-amber-600 text-white shadow-amber-700/20",
              ];

              return (
                <div
                  key={user.creatorId} // 👈 ফিক্সড: ইউনিক কি (Key) ম্যাপিং সুনিশ্চিত করা হলো
                  className="relative bg-[#11243A] border border-[#223753] hover:border-[#3B82F6]/40 p-5 rounded-2xl flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1.5 group shadow-lg"
                >
                  {/* 🥇 র্যাংক ব্যাজ */}
                  <div
                    className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-md ${index < 3 ? medalColors[index] : "bg-[#0B1725] text-[#7C8BA1] border border-[#223753]"}`}
                  >
                    {index === 0 ? <FiAward size={14} /> : index + 1}
                  </div>

                  <div className="space-y-4 mt-2">
                    {/* ইউজার অবতার */}
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-2xl ring-2 ring-[#223753] group-hover:ring-[#3B82F6]/50 bg-[#0B1725] flex items-center justify-center transition-all overflow-hidden">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FiUser size={24} className="text-[#7C8BA1]" />
                        )}
                      </div>
                    </div>

                    {/* নাম ও ডাইনামিক ইমেইল/রোল সেকশন */}
                    <div className="max-w-[160px]">
                      <h3
                        className="font-bold text-sm sm:text-base text-[#F8FAFC] truncate"
                        title={user.name}
                      >
                        {user.name}
                      </h3>
                      {/* যদি ইমেইল থাকে তবে ইমেইলের প্রথম অংশ দেখাবে, না থাকলে রোল দেখাবে */}
                      <p
                        className="text-[11px] font-mono text-[#7C8BA1] mt-0.5 truncate"
                        title={user.email !== "N/A" ? user.email : user.role}
                      >
                        {user.email !== "N/A"
                          ? user.email.split("@")[0]
                          : user.role}
                      </p>
                    </div>
                  </div>

                  {/* কন্ট্রিবিউশন স্কোর கவுন্টার */}
                  <div className="w-full mt-5 pt-3 border-t border-[#223753]/40 flex items-center justify-center gap-1.5 text-xs text-[#B8C4D6] font-medium">
                    <FiBookOpen size={13} className="text-[#3B82F6]" />
                    <span>
                      <strong className="text-white font-extrabold">
                        {user.totalLessons}
                      </strong>{" "}
                      lessons
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
