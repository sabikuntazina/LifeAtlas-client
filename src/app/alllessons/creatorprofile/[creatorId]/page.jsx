// 📁 src/app/alllessons/creatorProfile/[creatorId]/page.jsx


import MyLessonsInProfile from '@/app/profile/MyLessonsInProfile';
import { getCreatorLessons, getSpecificCreatorInformation } from '@/lib/adminFunctions/usersCollection';

import React from 'react';
import { FiUser } from 'react-icons/fi';

const CreatorProfilePage = async ({ params }) => {
 
  const { creatorId } = await params;

  
  const [creatorInfo, lessons] = await Promise.all([
    getSpecificCreatorInformation(creatorId),
    getCreatorLessons(creatorId)
  ]);

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] px-4 py-12 md:py-20 antialiased">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 👤 CREATOR BANNER & BIO CARD */}
        <div className="card bg-[#11243A] border border-[#223753] rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="avatar placeholder">
              <div className="w-24 h-24 rounded-full ring-4 ring-[#3B82F6]/40 overflow-hidden bg-[#0D1B2A] relative">
                {creatorInfo?.image ? (
                  <img src={creatorInfo.image} alt={creatorInfo.name} className="object-cover w-full h-full" />
                ) : (
                  <FiUser className="text-[#7C8BA1] w-12 h-12 mx-auto mt-6" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
                  {creatorInfo?.name || "Expert Instructor"}
                </h1>
                {creatorInfo?.plan === "premium" && (
                  <span className="bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30 text-xs font-black uppercase px-2.5 py-0.5 rounded-md">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-[#B8C4D6] text-sm font-medium">
                {creatorInfo?.role || "Content Creator"} — {creatorInfo?.email}
              </p>
              <p className="text-[#7C8BA1] text-xs max-w-xl leading-relaxed">
                Welcome to my public learning profile. Explore the structured modules and lessons I have published below.
              </p>
            </div>
          </div>
        </div>

        {/* 📚 CREATOR'S LESSONS GRID SECTION */}
        {/* আমরা আপনার তৈরি করা কম্পোনেন্টটি এখানে পাস করে দিচ্ছি */}
        <MyLessonsInProfile user={creatorInfo} lessons={lessons} />

      </div>
    </div>
  );
};

export default CreatorProfilePage;