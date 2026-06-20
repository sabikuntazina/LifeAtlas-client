'use client'

import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className="min-h-screen w-full bg-[#081221] flex flex-col items-center justify-center p-4 antialiased selection:bg-[#3B82F6]/30">
      
      <div className="flex flex-col items-center space-y-6 text-center max-w-sm w-full">
        
        {/* 🌀 মডার্ন গ্লোয়িং এবং স্পিনিং অ্যানিমেশন সেকশন */}
        <div className="relative flex items-center justify-center w-24 h-24">
          
          {/* বাইরের গ্লোয়িং ইফেক্ট রিং */}
          <div className="absolute inset-0 rounded-full bg-[#3B82F6]/10 blur-xl animate-pulse"></div>
          
          {/* DaisyUI এবং React Icons এর কম্বিনেশনে তৈরি মেইন স্পনার */}
          <div className="text-[#3B82F6] animate-spin duration-1000 ease-in-out">
            <AiOutlineLoading3Quarters size={56} className="opacity-90" />
          </div>
          
          {/* ভেতরের ছোট কাউন্টার-স্পিনিং রিং */}
          <div className="absolute text-[#2563EB] animate-[spin_1.5s_linear_infinite] reverse">
            <BiLoaderAlt size={32} className="opacity-75" />
          </div>
          
          {/* একদম মাঝখানের স্টেডি পালসিং ডট */}
          <div className="absolute w-2 h-2 bg-[#3B82F6] rounded-full shadow-[0_0_12px_#3B82F6] animate-ping"></div>
        </div>

        {/* 📝 ব্র্যান্ডিং এবং টেক্সট লোডার */}
        <div className="space-y-3 w-full">
          {/* আপনার ল্যান্ডিং পেজের সাথে মিল রেখে ব্র্যান্ড নাম */}
          <h2 className="text-2xl font-black tracking-widest text-[#F8FAFC]">
            <span className="text-[#3B82F6]">LIFE</span>ATLAS
          </h2>
          
          {/* DaisyUI এর কাস্টম প্রগ্রেস বার (যা ডার্ক থিমের সাথে পারফেক্ট ম্যাচ করবে) */}
          <div className="flex justify-center w-full">
            <progress className="progress progress-primary bg-[#11243A] w-40 h-1 rounded-full"></progress>
          </div>
          
          {/* স্মুথ টেক্সট অ্যানিমেশন */}
          <p className="text-xs font-semibold text-[#8CA0B8] uppercase tracking-widest animate-pulse mt-1">
            Loading Content...
          </p>
        </div>

      </div>

    </div>
  )
}

export default Loading