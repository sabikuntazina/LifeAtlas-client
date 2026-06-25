"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiFolder, 
  FiHeart, 
  FiPlusCircle, 
  FiCompass, 
  FiClock,
  FiArrowUpRight,
  FiActivity
} from 'react-icons/fi';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { authHeader, getServerSession } from '@/lib/core/session';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function UserDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalCreated: 0,
    totalSaved: 0,
    recentContributions: [],
    chartData: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserMetrics = async () => {
      try {
       
        const user= await getServerSession()
        
        const userId =user?.id || "";
        const email =user?.email || ""; 

        const res = await fetch(`${BASE_URL}/api/user/dashboard-summary?userId=${userId}&email=${email}`,
            {
        headers: await authHeader()
      }
        );
        const data = await res.json();

        if (data.success) {
          setDashboardData({
            totalCreated: data.totalCreated || 0,
            totalSaved: data.totalSaved || 0,
            recentContributions: data.recentContributions || [],
            chartData: data.chartData || []
          });
        }
      } catch (err) {
        console.error("Dashboard network connection error:", err);
       
        setDashboardData(prev => ({
          ...prev,
          chartData: [
            { name: 'Mon', contributions: 0 },
            { name: 'Tue', contributions: 0 },
            { name: 'Wed', contributions: 0 },
            { name: 'Thu', contributions: 0 },
            { name: 'Fri', contributions: 0 },
            { name: 'Sat', contributions: 0 },
            { name: 'Sun', contributions: 0 },
          ]
        }));
      } finally {
        setIsLoading(false);
      }
    };

    getUserMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081221] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <span className="loading loading-spinner loading-lg text-[#3B82F6]"></span>
          <p className="text-xs font-mono text-[#7C8BA1] tracking-widest uppercase">Syncing Your Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] p-4 md:p-8 space-y-8">
      
      {/* 1️⃣ HEADER WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#223753] pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Creative Hub Workspace
          </h1>
          <p className="text-sm text-[#B8C4D6] mt-1">
            Track your shared wisdom, saved concepts, and personal learning metrics.
          </p>
        </div>
        <div className="text-xs font-mono bg-[#0D1B2A] px-4 py-2 rounded-xl border border-[#223753] text-[#7C8BA1] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
          Profile Sync: <span className="text-[#3B82F6] font-bold">Active</span>
        </div>
      </div>

      {/* 2️⃣ STATS CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-lg flex items-center justify-between group hover:border-[#3B82F6] transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8BA1]">Lessons Contributed</span>
            <h3 className="text-3xl font-black text-[#F8FAFC]">
              {dashboardData.totalCreated.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-[#2563EB]/10 text-[#3B82F6] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
            <FiFolder size={24} />
          </div>
        </div>

        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-lg flex items-center justify-between group hover:border-pink-500 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8BA1]">Saved Archive (Favorites)</span>
            <h3 className="text-3xl font-black text-[#F8FAFC]">
              {dashboardData.totalSaved.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
            <FiHeart size={24} />
          </div>
        </div>
      </div>

      {/* 3️⃣ ANALYTICS CHART & QUICK SHORTCUTS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-[#11243A] p-5 md:p-6 rounded-2xl border border-[#223753] shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">Weekly Contribution Reflections</h3>
              <p className="text-xs text-[#7C8BA1]">Visual analysis of your generated community knowledge</p>
            </div>
            <FiActivity className="text-[#7C8BA1]" size={20} />
          </div>
          
          <div className="h-[280px] w-full text-xs">
            {dashboardData.chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm font-mono text-[#7C8BA1]">
                No contribution metrics log updated for this slot.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="userContributionsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223753" vertical={false} />
                  <XAxis dataKey="name" stroke="#7C8BA1" tickLine={false} />
                  <YAxis stroke="#7C8BA1" tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#223753', borderRadius: '12px', color: '#F8FAFC' }}
                    itemStyle={{ color: '#3B82F6' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#userContributionsGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">Quick Actions</h3>
            <p className="text-xs text-[#7C8BA1] mb-5">Seamless workspace utility routes</p>
            
            <div className="space-y-3">
              <Link href="/dashboard/user/add-lesson" className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-[#3B82F6] text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiPlusCircle className="text-[#3B82F6]" size={18} />
                  <span className="text-sm font-medium">Draft New Lesson</span>
                </div>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </Link>

              <Link href="/alllessons" className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-emerald-500 text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiCompass className="text-emerald-400" size={18} />
                  <span className="text-sm font-medium">Explore All Lessons</span>
                </div>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </Link>

              <Link href="/dashboard/user/my-lessons" className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-pink-500 text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiHeart className="text-pink-400" size={18} />
                  <span className="text-sm font-medium">My Saved Vault</span>
                </div>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#223753]/60 text-center text-xs text-[#7C8BA1]">
            Focus Matrix Architecture
          </div>
        </div>

      </div>

      {/* 4️⃣ RECENT CONTRIBUTIONS SECTION */}
      <div className="bg-[#11243A] p-5 md:p-6 rounded-2xl border border-[#223753] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-[#F8FAFC]">My Recent Contributions</h3>
            <p className="text-xs text-[#7C8BA1]">List of contents submitted by you recently</p>
          </div>
          <Link href="/dashboard/user/my-lessons" className="text-xs font-semibold text-[#3B82F6] hover:underline flex items-center gap-1">
            View My Catalog <FiArrowUpRight />
          </Link>
        </div>

        <div className="divide-y divide-[#223753]/60">
          {dashboardData.recentContributions.length === 0 ? (
            <div className="text-sm text-[#7C8BA1] py-6 font-mono flex flex-col items-center justify-center space-y-2">
              <p>You have not published any lessons yet.</p>
              <Link href="/dashboard/user/create-lesson" className="text-xs text-[#3B82F6] hover:underline">
                Click here to write your first lesson!
              </Link>
            </div>
          ) : (
            dashboardData.recentContributions.map((lesson) => (
              <div key={lesson._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-2 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0D1B2A] border border-[#223753] mt-0.5 text-[#3B82F6]">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-[#F8FAFC] line-clamp-1">
                      {lesson.title || "Untitled Lesson"}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-[10px] font-medium text-[#B8C4D6] bg-[#0D1B2A] px-2 py-0.5 rounded-md border border-[#223753]/40">
                        {lesson.category || "General"}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${lesson.visibility === 'private' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ● {lesson.visibility || 'public'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#7C8BA1] sm:text-right font-mono pl-11 sm:pl-0">
                  {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : "N/A"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}