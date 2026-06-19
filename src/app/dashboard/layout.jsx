import NavbarDashboard from "@/Components/Dashboard/NavbarDashboard";
import SidebarDashboard from "@/Components/Dashboard/SidebarDashboard";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#050816]">

      {/* Sidebar fixed width */}
      <SidebarDashboard />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar full width */}
        <NavbarDashboard />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;