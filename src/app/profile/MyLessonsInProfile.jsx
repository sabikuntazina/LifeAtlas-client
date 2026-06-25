import LessonCard from '@/Components/LessonCard';
import React from 'react';
import { FiBookOpen, FiSearch } from 'react-icons/fi';

const MyLessonsInProfile = ({ user, lessons }) => {
  return (
    <div className="max-w-6xl mx-auto">
      
      {/* SECTION TITLE & COUNTER */}
      <div className="flex items-center justify-between border-b border-[#223753]/60 pb-4">
        <div className="flex items-center gap-2.5">
          <FiBookOpen className="text-[#3B82F6]" size={30} />
          <h2 className="md:text-2xl font-bold text-[#F8FAFC] tracking-tight">Lessons
          </h2>
        </div>
        <span className="bg-[#11243A] border border-[#223753] text-xs font-mono font-bold text-[#3B82F6] px-3 py-1.5 rounded-lg shadow-sm">
          Total: {lessons.length}
        </span>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div 
              key={lesson._id} 
              className="transform hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <LessonCard
                lesson={lesson}
                user={user}
              />
            </div>
          ))
        ) : (
          /* PREMIUM EMPTY STATE */
          <div className="col-span-full py-20 px-4 text-center border-2 border-dashed border-[#223753] rounded-2xl bg-[#11243A]/20 backdrop-blur-sm flex flex-col items-center justify-center max-w-xl mx-auto my-4">
            <div className="w-14 h-14 rounded-2xl bg-[#11243A] border border-[#223753] flex items-center justify-center text-[#7C8BA1] mb-4 shadow-inner">
              <FiSearch size={24} className="text-[#3B82F6] animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC] tracking-wide mb-1">
              No Lessons Found
            </h3>
            <p className="text-[#7C8BA1] text-xs max-w-xs leading-relaxed">
              Lesson Has not been published yet. Try adjusting your search query or categories.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MyLessonsInProfile;