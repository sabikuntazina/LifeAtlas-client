import React from 'react';
import { FiAward } from 'react-icons/fi';

export default function FeaturedModal({ lesson, onClose, onConfirm }) {
  if (!lesson) return null;

  return (
    <div className="modal modal-open backdrop-blur-md transition-all duration-300">
      <div className="modal-box bg-gradient-to-b from-[#11243A] to-[#091524] border border-amber-500/30 text-white max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 shadow-inner">
            <FiAward size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-2xl text-slate-100 tracking-tight">Feature Lesson Status</h3>
            <p className="text-base text-[#94A3B8] leading-relaxed px-4">
              Do you want to alter the highlight matrix for <span className="text-amber-400 font-semibold">{lesson.title}</span>? This updates its prominence across the main application node.
            </p>
          </div>
        </div>
        <div className="modal-action grid grid-cols-2 gap-4 mt-8">
          <button 
            onClick={onClose}
            className="btn btn-md bg-[#091524] hover:bg-[#11243A] text-[#94A3B8] border border-[#223753] rounded-xl font-bold transition-all text-base h-14"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="btn btn-md bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white border-none rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all text-base h-14"
          >
            Confirm Feature
          </button>
        </div>
      </div>
    </div>
  );
}