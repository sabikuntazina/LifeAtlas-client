"use client";

import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteLessonModal({
  open,
  onClose,
  onConfirm,
  loading,
  lessonTitle,
}) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box bg-[#0B1220] border border-white/10 text-white max-w-md">

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-red-500/20 text-red-400">
            <FiAlertTriangle size={22} />
          </div>

          <div>
            <h3 className="font-bold text-lg">
              Delete Lesson
            </h3>
            <p className="text-xs text-gray-400">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-gray-300">
          Are you sure you want to delete
        </p>

        <p className="font-semibold text-white mt-2">
          {lessonTitle}
        </p>

        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="btn btn-error"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Lesson"}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}