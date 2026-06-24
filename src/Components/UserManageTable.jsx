"use client";

import { updateUserInformation } from '@/lib/adminFunctions/usersCollection';
import React, { useState } from 'react';
import { FiMail, FiCalendar, FiRefreshCw, FiChevronDown, FiBookOpen } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function UserManageTable({ initialUsers }) {
  // ব্যাকএন্ড থেকে আসা ইউজার লিস্ট স্টেট-এ সেট করা হলো
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState(null);

  const handleSelectChange = (userId, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const handleUpdateUser = async (user) => {
    try {
      setUpdatingId(user._id);
      
      const res = await updateUserInformation(user);
      console.log("Update Response:", res);

      if (res && res.success !== false) {
        toast.success(`${user.name || 'User'} updated successfully!`);
      } else {
        toast.error(res?.message || "Failed to update user parameters.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Network error, please try again!");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="card bg-[#11243A] border border-[#223753]/60 rounded-2xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="table w-full border-collapse">
          
          {/* TABLE HEAD */}
          <thead>
            <tr className="border-b border-[#223753] bg-[#0D1B2A]/60 text-[#7C8BA1] text-xs uppercase tracking-wider font-semibold">
              <th className="py-5 pl-6 bg-transparent">User Name</th>
              <th className="py-5 bg-transparent">Email Address</th>
              <th className="py-5 bg-transparent">Role Configuration</th>
              <th className="py-5 bg-transparent">Subscription Plan</th>
              <th className="py-5 bg-transparent">Joined Date</th>
              {/* 🎯 টোটাল লেসন কলামের হেডার */}
              <th className="py-5 bg-transparent">Total Lessons</th>
              <th className="py-5 pr-6 text-right bg-transparent">Commit</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-[#223753]/40 text-xs text-white/90">
            {users.length === 0 ? (
              <tr>
                {/* 🎯 কলাম সংখ্যা ৭ হওয়ায় colSpan="7" করা হয়েছে */}
                <td colSpan="7" className="text-center py-12 text-[#7C8BA1] text-sm">
                  No users found in the database.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const joinedDate = user.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'N/A';

                return (
                  <tr key={user._id} className="hover:bg-[#152B45]/20 transition-colors duration-200">
                    
                    {/* USER AVATAR & NAME */}
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="w-10 h-10 rounded-full ring-1 ring-[#3B82F6]/30 overflow-hidden bg-[#0D1B2A] relative">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="object-cover w-full h-full" />
                            ) : (
                              <span className="text-sm font-bold text-white uppercase">
                                {user.name?.charAt(0) || 'U'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="max-w-[140px] sm:max-w-[180px]">
                          <div className="font-bold text-sm text-[#F8FAFC] truncate">{user.name || 'Anonymous'}</div>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL ADDRESS */}
                    <td className="py-4">
                      <div className="text-sm text-[#B8C4D6] flex items-center gap-2 max-w-[200px] truncate">
                        <FiMail className="text-[#7C8BA1] shrink-0" size={14} />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </td>

                    {/* ROLE DROPDOWN */}
                    <td className="py-4">
                      <div className="relative inline-block w-32">
                        <select
                          value={user.role || 'user'}
                          onChange={(e) => handleSelectChange(user._id, 'role', e.target.value)}
                          className={`appearance-none w-full bg-[#0D1B2A] border text-xs font-semibold rounded-xl pl-3 pr-8 py-2.5 cursor-pointer transition-all duration-200 outline-none focus:ring-2 ${
                            user.role === 'admin' 
                              ? 'text-red-400 border-red-500/30 focus:border-red-500/60 focus:ring-red-500/20' 
                              : 'text-[#B8C4D6] border-[#223753] focus:border-[#3B82F6]/60 focus:ring-[#3B82F6]/20'
                          }`}
                        >
                          <option value="user" className="bg-[#0D1B2A] text-[#B8C4D6]">User</option>
                          <option value="admin" className="bg-[#0D1B2A] text-red-400 font-bold">Admin</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#7C8BA1]">
                          <FiChevronDown size={14} />
                        </div>
                      </div>
                    </td>

                    {/* PLAN DROPDOWN */}
                    <td className="py-4">
                      <div className="relative inline-block w-36">
                        <select
                          value={user.plan || 'free'}
                          onChange={(e) => handleSelectChange(user._id, 'plan', e.target.value)}
                          className={`appearance-none w-full bg-[#0D1B2A] border text-xs font-bold rounded-xl pl-3 pr-8 py-2.5 cursor-pointer transition-all duration-200 outline-none uppercase tracking-wider focus:ring-2 ${
                            user.plan === 'premium' 
                              ? 'text-yellow-400 border-yellow-500/30 focus:border-yellow-500/60 focus:ring-yellow-500/20' 
                              : 'text-[#3B82F6] border-[#223753] focus:border-[#3B82F6]/60 focus:ring-[#3B82F6]/20'
                          }`}
                        >
                          <option value="free" className="bg-[#0D1B2A] text-[#3B82F6]">Free</option>
                          <option value="premium" className="bg-[#0D1B2A] text-yellow-400 font-bold">Premium</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#7C8BA1]">
                          <FiChevronDown size={14} />
                        </div>
                      </div>
                    </td>

                    {/* JOINED DATE */}
                    <td className="py-4 font-medium font-mono text-[#8CA0B8]">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} className="text-[#7C8BA1]" />
                        {joinedDate}
                      </div>
                    </td>

                    {/* 🎯 TOTAL LESSONS COUNTER (নতুন কলাম ডাটা) */}
                    <td className="py-4">
                      <div className="text-sm text-[#B8C4D6] flex items-center gap-2">
                        <FiBookOpen className="text-[#3B82F6] shrink-0" size={14} />
                        <span className="font-mono font-bold text-white">
                          {user.totalLessons || 0}
                        </span>
                      </div>
                    </td>

                    {/* ACTION UPDATE BUTTON */}
                    <td className="py-4 pr-6 text-right">
                      <button
                        onClick={() => handleUpdateUser(user)}
                        disabled={updatingId === user._id}
                        className="btn btn-sm min-h-0 h-9 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#11243A] text-white border-none rounded-xl px-4 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 ml-auto"
                      >
                        <FiRefreshCw size={12} className={updatingId === user._id ? "animate-spin" : ""} />
                        {updatingId === user._id ? "Saving" : "Update"}
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}