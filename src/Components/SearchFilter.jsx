'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [tone, setTone] = useState(searchParams.get('tone') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');


  const updateQueries = (newQueries) => {
    const params = new URLSearchParams(searchParams.toString());
    

    params.set('page', '1'); 

    Object.keys(newQueries).forEach((key) => {
      if (newQueries[key]) {
        params.set(key, newQueries[key]);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
    router.refresh();
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateQueries({ search });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="w-full bg-[#11243A]/40 backdrop-blur-md border-2 border-[#223753] p-5 rounded-2xl shadow-xl space-y-4 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        
        {/* 🔍 Search Input Field */}
        <div className="relative md:col-span-4 group">
          <FiSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C8BA1] group-focus-within:text-[#3B82F6] transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search by title, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#081221]/90 border-2 border-[#223753] focus:border-[#3B82F6] text-[#F8FAFC] placeholder-[#7C8BA1] text-sm font-semibold outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          />
        </div>

        {/* 🗂️ Category Dropdown */}
        <div className="md:col-span-3">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); updateQueries({ category: e.target.value }); }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#081221]/90 border-2 border-[#223753] focus:border-[#3B82F6] text-[#B8C4D6] focus:text-[#F8FAFC] text-sm font-semibold outline-none cursor-pointer transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%237C8BA1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_top_50%] bg-no-repeat"
          >
            <option value="" className="bg-[#0D1B2A] text-[#7C8BA1]">📂 All Categories</option>
            <option value="Personal Growth" className="bg-[#0D1B2A] text-[#F8FAFC]">🌱 Personal Growth</option>
            <option value="Career" className="bg-[#0D1B2A] text-[#F8FAFC]">💼 Career</option>
            <option value="Relationships" className="bg-[#0D1B2A] text-[#F8FAFC]">❤️ Relationships</option>
            <option value="Mindset" className="bg-[#0D1B2A] text-[#F8FAFC]">🧠 Mindset</option>
            <option value="Mistakes Learned" className="bg-[#0D1B2A] text-[#F8FAFC]">⚠️ Mistakes Learned</option>
          </select>
        </div>

        {/*  Emotional Tone Dropdown */}
        <div className="md:col-span-2">
          <select
            value={tone}
            onChange={(e) => { setTone(e.target.value); updateQueries({ tone: e.target.value }); }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#081221]/90 border-2 border-[#223753] focus:border-[#3B82F6] text-[#B8C4D6] focus:text-[#F8FAFC] text-sm font-semibold outline-none cursor-pointer transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%237C8BA1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_top_50%] bg-no-repeat"
          >
            <option value="" className="bg-[#0D1B2A] text-[#7C8BA1]">🎭 All Tones</option>
            <option value="Motivational" className="bg-[#0D1B2A] text-[#F8FAFC]">⚡ Motivational</option>
            <option value="Sad" className="bg-[#0D1B2A] text-[#F8FAFC]">💧 Sad</option>
            <option value="Realization" className="bg-[#0D1B2A] text-[#F8FAFC]">💡 Realization</option>
            <option value="Gratitude" className="bg-[#0D1B2A] text-[#F8FAFC]">🙏 Gratitude</option>
          </select>
        </div>

        {/*  Sort By Dropdown */}
        <div className="md:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); updateQueries({ sortBy: e.target.value }); }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#081221]/90 border-2 border-[#223753] focus:border-[#3B82F6] text-[#B8C4D6] focus:text-[#F8FAFC] text-sm font-semibold outline-none cursor-pointer transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%237C8BA1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_top_50%] bg-no-repeat"
          >
            <option value="newest" className="bg-[#0D1B2A] text-[#F8FAFC]">🕒 Sort by: Newest</option>
            <option value="mostSaved" className="bg-[#0D1B2A] text-[#F8FAFC]">💾 Sort by: Most Saved</option>
          </select>
        </div>

      </div>
    </div>
  );
}