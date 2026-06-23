"use client";

import { deleteReportedLessonPermanently, deleteReportedLessonToIgnore } from '@/lib/adminFunctions/reportLesson';
import React, { useState } from 'react';
import { FiEye, FiCheckCircle, FiX, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function ReportedLessonHandleTable({ initialData = [] }) {
  const [reportedLessonsData, setReportedLessonsData] = useState(initialData);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);


  const handleDeleteLesson = async (lessonId) => {
    const loadingToast = toast.loading("Processing lesson removal...");
    setIsActionLoading(true);

    try {
      const res = await deleteReportedLessonPermanently(lessonId);

     
      if (res) {
        setReportedLessonsData((prev) => prev.filter((item) => item.lessonId !== lessonId));
        toast.success("Lesson has been permanently removed.", { id: loadingToast });
        setIsModalOpen(false); 
      } else {
        toast.error("Failed to delete the lesson. Please try again.", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting.", { id: loadingToast });
    } finally {
      setIsActionLoading(false);
    }
  };


  const handleIgnoreReport = async (lessonId) => {
    const loadingToast = toast.loading("Clearing reports...");
    setIsActionLoading(true);

    try {
      const res = await deleteReportedLessonToIgnore(lessonId);

      if (res) {
        setReportedLessonsData((prev) => prev.filter((item) => item.lessonId !== lessonId));
        toast.success("Reports dismissed. Lesson marked safe.", { id: loadingToast });
        setIsModalOpen(false); 
      } else {
        toast.error("Failed to ignore reports. Please try again.", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while dismissing reports.", { id: loadingToast });
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Tabular Display */}
      {reportedLessonsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-[#11243A] border border-[#223753] rounded-2xl text-center space-y-3">
          <FiCheckCircle size={40} className="text-emerald-400" />
          <h3 className="text-lg font-bold">All clear!</h3>
          <p className="text-sm text-[#7C8BA1]">No lessons have been reported currently.</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full rounded-2xl border border-[#223753] bg-[#11243A] shadow-2xl">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D1B2A] border-b border-[#223753] text-[#B8C4D6] uppercase text-xs tracking-wider">
                <th className="p-4 md:p-5">Lesson Details</th>
                <th className="p-4 md:p-5">Category</th>
                <th className="p-4 md:p-5 text-center">Reports Count</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#223753]/60">
              {reportedLessonsData.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-[#152B45]/40 transition-colors duration-150">
                  
                  {/* Lesson Details */}
                  <td className="p-4 md:p-5 max-w-xs md:max-w-sm">
                    <div className="font-bold text-[#F8FAFC] truncate text-sm md:text-base">
                      {lesson.title || "Untitled Lesson"}
                    </div>
                    <div className="text-xs text-[#7C8BA1] mt-0.5 truncate">
                      Creator ID: <span className="font-mono bg-[#081221] px-1 py-0.5 rounded text-[#B8C4D6]">{lesson.creatorId || "N/A"}</span>
                    </div>
                  </td>
                  
                  {/* Category */}
                  <td className="p-4 md:p-5 text-sm">
                    <span className="badge badge-sm border-[#223753] bg-[#0D1B2A] text-[#B8C4D6] px-2.5 py-2 font-medium">
                      {lesson.category || "General"}
                    </span>
                  </td>

                  {/* Report Count */}
                  <td className="p-4 md:p-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-red-500/10 text-red-400 border border-red-500/20">
                      {lesson.reportCount || 1} Reports
                    </span>
                  </td>

                  {/* Table Action (Only View Details) */}
                  <td className="p-4 md:p-5 text-right">
                    <button 
                      onClick={() => {
                        setSelectedLesson(lesson);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#0D1B2A] border border-[#223753] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-200 shadow-md"
                    >
                      <FiEye size={14} /> View Details
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Details Modal --- */}
      {isModalOpen && selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#081221]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-xl transform overflow-hidden rounded-2xl border border-[#223753] bg-gradient-to-b from-[#152B45] to-[#11243A] p-6 md:p-8 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3B82F6]" />
            
            {/* Close Cross Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#0D1B2A]/50 border border-[#223753]/60 text-[#7C8BA1] hover:text-[#F8FAFC] hover:bg-[#11243A] transition-all"
            >
              <FiX size={16} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Report Audit Log</span>
              <h3 className="text-lg font-bold text-[#F8FAFC] mt-2 truncate">
                {selectedLesson.title}
              </h3>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="bg-[#081221]/60 border border-[#223753]/60 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2 text-amber-400 text-sm font-semibold">
                  <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>Report Summary:</span>
                </div>
                
                <div className="border-t border-[#223753]/40 pt-3 space-y-2 text-sm text-[#B8C4D6]">
                  <div>
                    <span className="text-[#7C8BA1]">Primary Description:</span>
                    <p className="mt-1 text-[#F8FAFC] bg-[#0D1B2A]/40 p-3 rounded-lg border border-[#223753]/30 text-xs leading-relaxed">
                      {selectedLesson.description || "No description provided during report initialization."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mt-3 pt-2">
                    <div>
                      <span className="text-[#7C8BA1] block">Creator Identity</span>
                      <span className="text-[#F8FAFC] font-medium block truncate mt-0.5">{selectedLesson.creatorName || "Unknown"}</span>
                    </div>
                    <div>
                      <span className="text-[#7C8BA1] block">First Reported At</span>
                      <span className="text-[#F8FAFC] font-medium block mt-0.5">
                        {selectedLesson.createdAt ? new Date(selectedLesson.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t border-[#223753]/40 flex gap-3 justify-end">
              <button 
                disabled={isActionLoading}
                onClick={() => handleIgnoreReport(selectedLesson.lessonId)}
                className="btn btn-sm text-xs rounded-xl bg-emerald-600 hover:bg-emerald-500 border-none text-white px-4 py-2 h-auto min-h-0 disabled:opacity-50"
              >
                Ignore
              </button>
              <button 
                disabled={isActionLoading}
                onClick={() => handleDeleteLesson(selectedLesson.lessonId)}
                className="btn btn-sm text-xs rounded-xl bg-red-600 hover:bg-red-500 border-none text-white px-4 py-2 h-auto min-h-0 disabled:opacity-50"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}