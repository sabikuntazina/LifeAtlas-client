"use client";

import { profileEdit } from "@/lib/action/profileEdit"; // আপনার অ্যাকশন পাথটি ঠিক আছে কি না নিশ্চিত হোন
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProfileEditModal({ isOpen, onClose, user }) {
  const [isUpdating, setIsUpdating] = useState(false);

  // মোডাল যদি ওপেন না থাকে, তবে কিছুই রেন্ডার হবে না
  if (!isOpen) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.target);
    const updatedData = {
      name: formData.get("name"),
      image: formData.get("image"),
    };

    try {
      const res = await profileEdit(user.id || user._id, updatedData);

      if (res && res.success) {
        toast.success("Profile updated successfully!");
        onClose(); // মোডাল বন্ধ করবে
        window.location.reload(); // ডাটা লাইভ আপডেট রিফ্রেশ করার জন্য
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle bg-[#081221]/60 backdrop-blur-sm z-50">
      <div className="modal-box bg-[#0D1B2A] border border-[#223753] text-white p-6 max-w-md rounded-2xl relative shadow-2xl">
        
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7C8CA1] hover:text-white transition-all cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="space-y-1 mb-6">
          <h3 className="text-xl font-bold tracking-wide flex items-center gap-2">
            <FaEdit className="text-[#3B82F6] text-lg" /> Edit Profile Details
          </h3>
          <p className="text-xs text-[#8CA0B8]">Update your public information instantly.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          
          {/* Name Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[#8CA0B8] text-xs font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              required
              placeholder="Enter your name"
              className="input input-bordered w-full bg-[#11243A] border-[#223753] text-sm text-white focus:outline-none focus:border-[#3B82F6] rounded-xl transition-all"
            />
          </div>

          {/* Profile Image URL Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[#8CA0B8] text-xs font-semibold">Profile Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              defaultValue={user?.image}
              placeholder="https://example.com/avatar.jpg"
              className="input input-bordered w-full bg-[#11243A] border-[#223753] text-sm text-white focus:outline-none focus:border-[#3B82F6] rounded-xl transition-all"
            />
          </div>

          {/* Uneditable Email Field */}
          <div className="form-control w-full opacity-60">
            <label className="label py-1">
              <span className="label-text text-[#8CA0B8] text-xs font-semibold">Email Address (Linked)</span>
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full bg-[#081221] border-[#223753] text-sm text-[#7C8BA1] rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn border-[#223753] bg-[#11243A] hover:bg-[#152B45] text-white text-xs font-bold rounded-xl px-5 h-[42px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="btn border-none bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-xl px-6 h-[42px] min-w-[120px] cursor-pointer"
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}