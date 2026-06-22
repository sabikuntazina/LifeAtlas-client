import { getAllReportedLessons } from '@/lib/adminFunctions/reportLesson';
import React from 'react';
import ReportedLessonHandleTable from './ReportedLessonHandleTable';

// 🚀 এটি একটি Pure Server Component (কোনো "use client" থাকবে না)
const ReportedLessonHandlePage = async () => {
  // সার্ভার সাইডেই ডেটা ফেচ হবে
  const reportedLessons = await getAllReportedLessons() || [];

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] p-6 md:p-10">
      
      {/* Header Summary */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#223753] pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#F8FAFC] tracking-tight flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            Reported Content Moderation
          </h1>
          <p className="text-sm text-[#B8C4D6] mt-1">
            Review and take immediate action on learning modules flagged by the community.
          </p>
        </div>
        <div className="bg-[#11243A] px-4 py-2 rounded-xl border border-[#223753] text-sm font-medium">
          Total Flagged: <span className="text-[#3B82F6] font-bold">{reportedLessons.length}</span>
        </div>
      </div>

      {/* 📊 শুধু ডেটা পাস করে দিন, কোনো ফাংশন এখান থেকে পাস করবেন না */}
      <ReportedLessonHandleTable initialData={reportedLessons} />

    </div>
  );
};

export default ReportedLessonHandlePage;