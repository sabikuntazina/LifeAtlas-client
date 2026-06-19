"use client";

import { authClient } from "@/lib/auth-client";
import { FaEdit } from "react-icons/fa";
import {
  FiUser,
  FiMail,
  FiShield,
  FiStar,
  FiCalendar,
} from "react-icons/fi";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

 if (!user) {
  return (
    <div className="min-h-screen bg-[#081221] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-2xl border border-[#223753] bg-[#0D1B2A] p-8 animate-pulse">

        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-[#11243A]" />

          <div className="space-y-3 text-center">
            <div className="h-6 w-48 bg-[#11243A] rounded-lg mx-auto" />
            <div className="h-4 w-64 bg-[#11243A] rounded-lg mx-auto" />
            <div className="h-3 w-40 bg-[#11243A] rounded-lg mx-auto" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-3 mt-8">
          <div className="h-8 w-24 bg-[#11243A] rounded-full" />
          <div className="h-8 w-24 bg-[#11243A] rounded-full" />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="p-4 rounded-xl border border-[#223753] bg-[#11243A]"
            >
              <div className="h-3 w-20 bg-[#1B3654] rounded mb-3" />
              <div className="h-4 w-full bg-[#1B3654] rounded" />
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-6 h-14 rounded-xl bg-[#11243A]" />
      </div>
    </div>
  );
}

  const isPremium = user?.plan === "premium";
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Account <span className="text-[#3B82F6]">Overview</span>
          </h1>
          <p className="text-[#8CA0B8] text-sm">
            Manage your identity and subscription details
          </p>
        </div>

        {/* MAIN CARD */}
        <div
          className={`rounded-2xl border backdrop-blur-md p-8 space-y-8
          ${
            isPremium
              ? "border-[#3B82F6]/40 bg-[#0D1B2A]"
              : "border-[#223753] bg-[#0D1B2A]"
          }`}
        >

          {/* TOP USER SECTION (PROFESSIONAL LAYOUT) */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

            {/* LEFT: AVATAR + INFO */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* AVATAR */}
              <div className="relative">
                <img
                  src={user?.image}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#223753]"
                />

                {isPremium && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    PREMIUM
                  </span>
                )}
              </div>

              {/* INFO */}
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-semibold flex items-center gap-2 justify-center md:justify-start">
                  <FiUser className="text-[#3B82F6]" />
                  {user?.name}
                </h2>

                <p className="text-[#8CA0B8] flex items-center gap-2 justify-center md:justify-start">
                  <FiMail />
                  {user?.email}
                </p>

                <p className="text-xs text-[#6B7C93] flex items-center gap-2 justify-center md:justify-start">
                  <FiCalendar />
                  Joined {new Date(user?.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* RIGHT: EDIT BUTTON */}
            <button
              onClick={() => (window.location.href = "/profile/edit")}
              className="px-4 py-2 rounded-xl bg-[#11243A] border border-[#223753] hover:border-[#3B82F6] hover:text-[#3B82F6] text-sm transition-all flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* BADGES ROW */}
          <div className="flex flex-wrap gap-3">

            {/* ROLE */}
            <span
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 border
              ${
                isAdmin
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : "bg-gray-500/10 text-gray-300 border-gray-500/20"
              }`}
            >
              <FiShield />
              {user?.role.toUpperCase()}
            </span>

            {/* PLAN */}
            <span
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 border
              ${
                isPremium
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}
            >
              <FiStar />
              {user?.plan.toUpperCase()}
            </span>
          </div>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-4 pt-2">

            <div className="p-4 rounded-xl bg-[#11243A] border border-[#223753]">
              <p className="text-xs text-[#7C8CA1]">User ID</p>
              <p className="text-sm break-all mt-1 text-white/80">
                {user?.id || user?._id}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11243A] border border-[#223753]">
              <p className="text-xs text-[#7C8CA1]">Account Type</p>
              <p className="text-sm mt-1 text-white/80 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11243A] border border-[#223753]">
              <p className="text-xs text-[#7C7CA1]">Plan</p>
              <p className="text-sm mt-1 text-white/80 capitalize">
                {user?.plan}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11243A] border border-[#223753]">
              <p className="text-xs text-[#7C7CA1]">Email Status</p>
              <p className="text-sm mt-1 text-white/80">
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>

          {/* FOOTER BANNER */}
          {isAdmin ? (
            <div className="rounded-xl p-4 border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm">
              🔥 Admin account — full system access enabled.
            </div>
          ) : isPremium ? (
            <div className="rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 text-sm">
              ✨ Premium member benefits are active on your account.
            </div>
          ) : (
            <div className="rounded-xl p-4 border border-blue-500/20 bg-blue-500/10 text-blue-300 text-sm">
              Upgrade to Premium to unlock advanced features.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}