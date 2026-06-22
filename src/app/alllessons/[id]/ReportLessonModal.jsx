"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ReportLessonModal({ isOpen, onClose, onConfirm, isReporting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop with modern blur effect */}
      <div 
        className="fixed inset-0 bg-[#081221]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modern Professional Modal Card */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-[#223753] bg-gradient-to-b from-[#152B45] to-[#11243A] p-6 md:p-8 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle Top Red Accent Line for Alert Warning */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500/20 via-red-500 to-red-500/20" />

        {/* Close Button Inside Glassy Circle */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0D1B2A]/50 border border-[#223753]/60 text-[#7C8BA1] hover:text-[#F8FAFC] hover:bg-[#11243A] transition-all duration-200"
          disabled={isReporting}
        >
          <FiX size={16} />
        </button>

        {/* Content Layout - Left Aligned Flex */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Enhanced Alert Icon Frame */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 shadow-inner shadow-red-500/5">
            <FiAlertTriangle size={22} className="animate-pulse" />
          </div>
          
          {/* Text Descriptions */}
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
              Confirm Content Report
            </h3>
            <p className="text-sm text-[#B8C4D6] leading-relaxed">
              Are you sure you want to flag this learning module? This will instantly log a request for our administration team to review the content against our community guidelines.
            </p>
            <div className="bg-[#081221]/40 border border-[#223753]/40 rounded-lg p-3 mt-3">
              <p className="text-[11px] text-[#7C8BA1] uppercase font-mono font-semibold tracking-wider">
                Note to User
              </p>
              <p className="text-xs text-[#7C8BA1] mt-0.5">
                Abuse of the reporting system may lead to account restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Border-top Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#223753]/40 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isReporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#223753] bg-[#0D1B2A] hover:bg-[#152B45] text-[#B8C4D6] hover:text-[#F8FAFC] text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isReporting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
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