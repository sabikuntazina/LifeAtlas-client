import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DeleteModal({ lesson, onClose, onConfirm }) {
  if (!lesson) return null;

  return (
    <div className="modal modal-open backdrop-blur-md transition-all duration-300">
      <div className="modal-box bg-gradient-to-b from-[#11243A] to-[#091524] border border-red-500/30 text-white max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 shadow-inner">
            <FiAlertTriangle size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-2xl text-slate-100 tracking-tight">Destructive Action</h3>
            <p className="text-base text-[#94A3B8] leading-relaxed px-4">
              Are you absolutely sure you want to scrub <span className="text-red-400 font-semibold">{lesson.title}</span>? This process deletes records globally.
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
            className="btn btn-md bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-none rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all text-base h-14"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}