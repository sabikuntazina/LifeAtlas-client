import NavbarDashboard from "@/Components/Dashboard/NavbarDashboard";
import SidebarDashboard from "@/Components/Dashboard/SidebarDashboard";

const DashboardLayout = ({ children }) => {
  return (
    // মোবাইলে কন্টেন্টগুলো নিচে নিচে (flex-col) সাজাবে, বড় স্ক্রিনে পাশাপাশি (lg:flex-row) যাবে
    <div suppressHydrationWarning className="flex flex-col lg:flex-row min-h-screen bg-[#050816] text-[#F8FAFC]">

      {/* সাইডবার রেসপন্সিভলি হ্যান্ডেলড */}
      <SidebarDashboard />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ফুল উইথ ন্যাভবার */}
        <NavbarDashboard />

        {/* পেজ কন্টেন্ট - মোবাইল প্যাডিং এবং ডেস্কটপ প্যাডিং অপ্টিমাইজড */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;