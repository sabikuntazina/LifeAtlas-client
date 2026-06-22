"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#081221] flex flex-col justify-between items-center p-8 sm:p-16 antialiased selection:bg-[#2563EB]/20">
      

      <div className="w-full max-w-4xl flex justify-between items-center border-b border-[#223753]/40 pb-6 opacity-80">
        <span className="text-[11px] tracking-[0.3em] text-[#F8FAFC] font-semibold uppercase">
          LifeAtlas
        </span>
        <span className="text-[10px] tracking-widest text-[#7C8BA1] font-mono">
          STATUS // 404
        </span>
      </div>

   
      <div className="max-w-xl w-full text-center my-auto space-y-10">
        
    
        <div className="space-y-2">
          <h1 className="text-[100px] sm:text-[130px] font-extralight tracking-[-0.05em] text-white/90 leading-none">
            404
          </h1>
          <p className="text-[11px] tracking-[0.5em] text-[#3B82F6] uppercase font-semibold">
            Page Not Found
          </p>
        </div>


        <p className="text-xs sm:text-sm text-[#B8C4D6] max-w-sm mx-auto leading-relaxed font-light">
          We cannot seem to find the page you are looking for. Please check the URL or return to the dashboard to continue exploring.
        </p>

     
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-xs mx-auto">
          
         
          <button
            onClick={() => router.back()}
            className="w-full py-3 px-5 rounded-xl bg-transparent border border-[#223753] hover:border-[#7C8BA1]/40 text-[#B8C4D6] hover:text-white text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            Go Back
          </button>

       
          <Link
            href="/"
            className="w-full py-3 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium tracking-wider uppercase transition-all duration-300 text-center shadow-md shadow-blue-900/20"
          >
            Home
          </Link>
          
        </div>

      </div>


      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#223753]/30 pt-6">
        <p className="text-[11px] text-[#7C8BA1]/50 font-light">
          &copy; {new Date().getFullYear()} LifeAtlas. Intelligence System.
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] tracking-wide text-[#7C8BA1]/60">
            All nodes secure
          </span>
        </div>
      </div>

    </div>
  );
}