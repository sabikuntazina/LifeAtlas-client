import UserManageTable from '@/Components/UserManageTable';
import { getUserInformation } from '@/lib/adminFunctions/usersCollection';
import React from 'react';
import { FiUsers } from 'react-icons/fi';


const UserManagePage = async () => {

  const usersInformation = await getUserInformation() || [];
  

  return (
    <div className="min-h-screen bg-[#081221] text-[#F8FAFC] px-4 py-8 md:py-12 antialiased selection:bg-[#3B82F6]/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#223753] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <FiUsers className="text-[#3B82F6]" />
              Manage <span className="text-[#3B82F6]">Users</span>
            </h1>
            <p className="text-[#8CA0B8] text-sm">
              In-line account configuration. Update roles, subscription plans, and privileges instantly.
            </p>
          </div>
          <div className="stats bg-[#11243A] border border-[#223753]/60 text-white shadow rounded-xl px-4 py-2">
            <div className="stat p-0 flex flex-col justify-center">
              <div className="stat-title text-xs text-[#7C8BA1] font-medium uppercase tracking-wider">Total Users</div>
              <div className="stat-value text-xl font-bold text-[#3B82F6]">{usersInformation.length}</div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE TABLE COMPONENT */}
        <UserManageTable initialUsers={usersInformation} />

      </div>
    </div>
  );
};

export default UserManagePage;