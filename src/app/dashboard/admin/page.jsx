"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiBookOpen, 
  FiHeart, 
  FiPlusCircle, 
  FiUser, 
  FiSettings, 
  FiArrowUpRight, 
  FiClock 
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
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { authHeader } from '@/lib/core/session';

export default function AdminDashboardPage() {

  const [dashboardData, setDashboardData] = useState({
    totalLessons: 0,
    totalSaved: 0,
    recentLessons: [],
    chartData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";


  useEffect(() => {
    const getDashboardMetrics = async () => {
      try {
    
        const res = await fetch(`${BASE_URL}/api/admin/dashboard-summary`,
            {
        headers: await authHeader()
      }
        );
        const data = await res.json();
        console.log(data)

        if (data.success) {
          setDashboardData({
            totalLessons: data.totalLessons,
            totalSaved: data.totalSaved,
            recentLessons: data.recentLessons,
            chartData: data.chartData
          });
        } else {
          toast.error("Metrics synchronized tracking failed.");
        }
      } catch (err) {
        console.error("Dashboard connection error:", err);
        toast.error("Unable to connect to the cloud database.");
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardMetrics();
  }, []);

 
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081221] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <span className="loading loading-spinner loading-lg text-[#3B82F6]"></span>
          <p className="text-xs font-mono text-[#7C8BA1] tracking-widest uppercase">Fetching Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] p-4 md:p-8 space-y-8">
      
      {/* 1️⃣ HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#223753] pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome Back, Admin!
          </h1>
          <p className="text-sm text-[#B8C4D6] mt-1">
            Here is what is happening with your learning platform today.
          </p>
        </div>
        <div className="text-xs font-mono bg-[#0D1B2A] px-4 py-2 rounded-xl border border-[#223753] text-[#7C8BA1]">
          System Status: <span className="text-emerald-400 font-bold">Online</span>
        </div>
      </div>

      {/* 2️⃣ STATS GRID SECTION: Real DB Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Total Lessons */}
        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-lg flex items-center justify-between group hover:border-[#3B82F6] transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8BA1]">Total Lessons Created</span>
            <h3 className="text-3xl font-black text-[#F8FAFC]">
              {dashboardData.totalLessons.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-[#2563EB]/10 text-[#3B82F6] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
            <FiBookOpen size={24} />
          </div>
        </div>

        {/* Stat 2: Total Saved */}
        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-lg flex items-center justify-between group hover:border-pink-500 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8BA1]">Total Saved (Favorites)</span>
            <h3 className="text-3xl font-black text-[#F8FAFC]">
              {dashboardData.totalSaved.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
            <FiHeart size={24} />
          </div>
        </div>
      </div>

      {/* 3️⃣ MAIN BODY SPLIT: Dynamic Chart & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Analytics Chart */}
        <div className="lg:col-span-2 bg-[#11243A] p-5 md:p-6 rounded-2xl border border-[#223753] shadow-xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#F8FAFC]">Weekly Activity Reflections</h3>
            <p className="text-xs text-[#7C8BA1]">Overview of content contributions over the past 7 days</p>
          </div>
          
          <div className="h-[280px] w-full text-xs">
            {dashboardData.chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm font-mono text-[#7C8BA1]">
                No contribution logs recorded this week.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#colorContributions)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

       {/* Right 1 Column: Shortcuts (Fixed for Admin Scope) */}
        <div className="bg-[#11243A] p-6 rounded-2xl border border-[#223753] shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">Quick Shortcuts</h3>
            <p className="text-xs text-[#7C8BA1] mb-5">Instant access to administrative controls</p>
            
            <div className="space-y-3">
              {/* Shortcut 1: Manage Users */}
              <Link href={'/dashboard/admin/manage-users'} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-[#3B82F6] text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiUser className="text-[#3B82F6]" size={18} />
                  <span className="text-sm font-medium">Manage Users</span>
                </div>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </Link>

              {/* Shortcut 2: Reported Lessons */}
              <Link href={'/dashboard/admin/reported-lessons'} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-red-500 text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="text-red-400" size={18} />
                  <span className="text-sm font-medium">Reported Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500/20 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded-md border border-red-500/30">Review</span>
                  <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                </div>
              </Link>

              {/* Shortcut 3: Admin Settings */}
              <Link href={'/profile'} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0D1B2A] border border-[#223753] hover:border-amber-400 text-[#B8C4D6] hover:text-[#F8FAFC] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <FiSettings className="text-amber-400" size={18} />
                  <span className="text-sm font-medium">Admin Settings</span>
                </div>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#223753]/60 text-center text-xs text-[#7C8BA1]">
            Be Happy
          </div>
        </div>

      </div>

      {/* 4️⃣ RECENTLY ADDED LESSONS SECTION */}
      <div className="bg-[#11243A] p-5 md:p-6 rounded-2xl border border-[#223753] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-[#F8FAFC]">Recently Added Lessons</h3>
            <p className="text-xs text-[#7C8BA1]">The latest updates synced directly from database</p>
          </div>
          <Link href={'/dashboard/admin/manage-lessons'} className="text-xs font-semibold text-[#3B82F6] hover:underline flex items-center gap-1">
            View All Lessons <FiArrowUpRight />
          </Link>
        </div>

        <div className="divide-y divide-[#223753]/60">
          {dashboardData.recentLessons.length === 0 ? (
            <p className="text-sm text-[#7C8BA1] py-4 font-mono">No documents found in lesson collection.</p>
          ) : (
            dashboardData.recentLessons.map((lesson) => (
              <div key={lesson._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-2 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0D1B2A] border border-[#223753] mt-0.5 text-[#3B82F6]">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-[#F8FAFC] line-clamp-1">
                      {lesson.title || "Untitled Lesson"}
                    </h4>
                    <span className="inline-block text-[11px] font-medium text-[#B8C4D6] mt-0.5 bg-[#0D1B2A] px-2 py-0.5 rounded-md border border-[#223753]/40">
                      {lesson.category || "General"}
                    </span>
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