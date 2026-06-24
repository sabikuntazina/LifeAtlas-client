// src/app/dashboard/admin/manage-lessons/page.jsx

import { getAllLessons } from '@/lib/api/getAllLessons';
import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import ManageLessonsTable from './ManageLessonsTable';

const ManageLessonPage = async () => {
  // ১. এপিআই কল করা হলো
  const apiResponse = await getAllLessons();

  // 🎯 ফিক্সড: যদি এপিআই থেকে সরাসরি অ্যারে না এসে অবজেক্ট (যেমন: apiResponse.data) আসে, 
  // তবে সেটি ডিফেন্সিভলি হ্যান্ডেল করা হলো যেন কোনোভাবেই ক্র্যাশ না করে।
  const lessons = Array.isArray(apiResponse)
    ? apiResponse
    : apiResponse?.data && Array.isArray(apiResponse.data)
    ? apiResponse.data
    : [];

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] px-4 py-8 md:py-12 antialiased selection:bg-[#3B82F6]/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#223753] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <FiBookOpen className="text-[#3B82F6]" />
              Manage <span className="text-[#3B82F6]">Lessons</span>
            </h1>
            <p className="text-[#8CA0B8] text-sm">
              Review user lessons, toggle feature status, handle flags, and moderate inappropriate content.
            </p>
          </div>
          <div className="stats bg-[#11243A] border border-[#223753]/60 text-white shadow rounded-xl px-4 py-2">
            <div className="stat p-0 flex flex-col justify-center">
              <div className="stat-title text-xs text-[#7C8BA1] font-medium uppercase tracking-wider">Total Lessons</div>
              <div className="stat-value text-xl font-bold text-[#3B82F6]">{lessons.length}</div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE LESSONS TABLE & FILTERS */}
        <ManageLessonsTable initialLessons={lessons} />

      </div>
    </div>
  );
};

export default ManageLessonPage;