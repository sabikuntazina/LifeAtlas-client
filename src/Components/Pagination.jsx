'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber);

    // ১. URL পরিবর্তন হবে (কোনো ফুল পেজ রিলোড ছাড়া)
    router.push(`?${params.toString()}`, { scroll: true });

    // 🎯 ২. এই লাইনটি সার্ভার কম্পোনেন্টকে ফোর্স করবে ব্যাকঅ্যান্ড থেকে নতুন ডেটা রি-ফেচ করতে
    router.refresh(); 
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        const isActive = currentPage === i;
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`relative min-w-[38px] h-9 px-3 rounded-lg text-xs font-mono font-bold transition-all duration-300 transform active:scale-90 flex items-center justify-center border-2 ${
              isActive
                ? 'bg-[#2563EB] border-[#3B82F6] text-white shadow-[0_0_25px_rgba(37,99,235,0.45)] ring-2 ring-[#3B82F6]/50 font-extrabold'
                : 'bg-[#11243A]/60 border-[#223753] text-[#CBD5E1] hover:text-white hover:bg-[#1D4ED8]/20 hover:border-[#3B82F6]/60'
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span 
            key={`dots-${i}`} 
            className="w-8 h-9 flex items-center justify-center text-[#3B82F6] font-black text-xs tracking-widest select-none"
          >
            •••
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="mt-20 flex justify-center items-center">
      {/* 🌌 মেইন কন্টেইনার: বোল্ড বর্ডার ও ডিপ শ্যাডো */}
      <div className="flex items-center gap-2 p-2 bg-[#0D1B2A]/80 backdrop-blur-md border-2 border-[#223753] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] select-none">
        
        {/* ◀️ Left Arrow Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#CBD5E1] hover:text-[#3B82F6] bg-[#11243A]/40 border-2 border-[#223753] hover:border-[#3B82F6] hover:bg-[#11243A] transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none transform active:scale-95 group"
          title="Previous Page"
        >
          <FiArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        {/* 🔢 Page Numbers Wrapper */}
        <div className="flex items-center gap-1.5">
          {renderPageNumbers()}
        </div>

        {/* ▶️ Right Arrow Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#CBD5E1] hover:text-[#3B82F6] bg-[#11243A]/40 border-2 border-[#223753] hover:border-[#3B82F6] hover:bg-[#11243A] transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none transform active:scale-95 group"
          title="Next Page"
        >
          <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        
      </div>
    </div>
  );
}