"use client";

import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ReportLessonModal({ isOpen, onClose, onConfirm, isReporting }) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;


  const reportReasons = [
    "Inappropriate or offensive content",
    "Copyright violation / Plagiarism",
    "Misleading or incorrect information",
    "Spam or promotional content",
    "Harassment or hate speech",
    "Other",
  ];

  const handleSubmit = () => {
    if (!reason) return;
    onConfirm(reason); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#081221]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-[#223753] bg-gradient-to-b from-[#152B45] to-[#11243A] p-6 md:p-8 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Red Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500/20 via-red-500 to-red-500/20" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0D1B2A]/50 border border-[#223753]/60 text-[#7C8BA1] hover:text-[#F8FAFC] hover:bg-[#11243A] transition-all duration-200"
          disabled={isReporting}
        >
          <FiX size={16} />
        </button>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 shadow-inner">
            <FiAlertTriangle size={22} className="animate-pulse" />
          </div>
          
          <div className="space-y-4 flex-1 w-full">
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                Confirm Content Report
              </h3>
              <p className="text-sm text-[#B8C4D6] leading-relaxed mt-1">
                Are you sure you want to flag this learning module? Please select a reason for review.
              </p>
            </div>

            {/* 🎯 REPORT REASON DROPDOWN */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider block">
                Select Reason <span className="text-red-400">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isReporting}
                className="w-full bg-[#081221] border border-[#223753] rounded-xl px-3 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
              >
                <option value="" disabled>-- Choose a reason --</option>
                {reportReasons.map((res, idx) => (
                  <option key={idx} value={res} className="bg-[#11243A]">
                    {res}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#081221]/40 border border-[#223753]/40 rounded-lg p-3">
              <p className="text-[11px] text-[#7C8BA1] uppercase font-mono font-semibold tracking-wider">
                Note to User
              </p>
              <p className="text-xs text-[#7C8BA1] mt-0.5">
                Abuse of the reporting system may lead to account restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#223753]/40 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isReporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#223753] bg-[#0D1B2A] hover:bg-[#152B45] text-[#B8C4D6] hover:text-[#F8FAFC] text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isReporting || !reason}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isReporting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                <span>Submitting...</span>
              </>
            ) : (
              "Confirm Report"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}