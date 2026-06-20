'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { authClient } from '@/lib/auth-client'
import NavLink from '../NavLink'
import { FaCrown } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi' // 👈 হ্যামবার্গার আইকন আবার আনা হলো

const NavbarDashboard = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user
  
  const isAdmin = user?.role === "admin"
  const isPremium = user?.plan === "premium"

  const showUpgrade = user && !isAdmin && !isPremium

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"
        }
      }
    })
  }

  const dashboardLinks = {
    user: '/dashboard/user',
    admin: '/dashboard/admin'
  }

  // মোবাইল সাইডবার খোলার জন্য কাস্টম ইভেন্ট ট্রিগার
  const openMobileSidebar = () => {
    const event = new CustomEvent('toggle-sidebar', { detail: true })
    window.dispatchEvent(event)
  }

  return (
    <div className="sticky top-0 py-2 z-40 w-full bg-[#081221]/90 backdrop-blur border-b border-[#223753]">
      <div className="navbar w-full px-4 lg:px-6 text-[#F8FAFC] flex justify-between items-center">

        {/* 📱 MOBILE LEFT: HAMBURGER + LOGO (শুধুমাত্র মোবাইলে দেখাবে) */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={openMobileSidebar}
            className="p-2 rounded-xl bg-[#11243A] text-white border border-[#223753] hover:bg-[#2563EB] transition-colors"
          >
            <FiMenu size={18} />
          </button>
          <h2 className="font-bold text-base sm:text-lg">
            <span className="text-[#3B82F6]">Life</span>Atlas
          </h2>
        </div>

        {/* 💻 DESKTOP LEFT: NAVIGATION LINKS (মোবাইলে একদম হাইড থাকবে) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal text-sm font-semibold gap-2 p-0">
            <NavLink href="/"><li>Home</li></NavLink>
            <NavLink href="/alllessons"><li>All Lessons</li></NavLink>
            {user && !isAdmin && (
              <>
                <NavLink href="/dashboard/add-lesson"><li>Add Lesson</li></NavLink>
                <NavLink href="/dashboard/my-lessons"><li>My Lessons</li></NavLink>
              </>
            )}
          </ul>
        </div>

        {/* 🔒 RIGHT: USER PROFILE & ACTIONS (সব স্ক্রিনেই একদম ডানপাশে থাকবে) */}
        <div className="flex-none flex items-center gap-2 sm:gap-3">
          
          {!user ? (
            <ul className="menu menu-horizontal gap-2 p-0">
              <li>
                <Link
                  href="/login"
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              {showUpgrade && (
                <Link
                  href="/pricing"
                  className="btn btn-sm text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#111827] border-none rounded-xl px-2.5 sm:px-4 min-h-0 h-9"
                >
                  <FaCrown />
                  <span className="hidden sm:inline">Upgrade</span>
                </Link>
              )}

              {/* PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 bg-[#0D1B2A] border border-[#223753] px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl active:scale-95 transition-all hover:border-[#3B82F6]"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user"
                      width={32}
                      height={32}
                      className="rounded-full border border-[#3B82F6] w-7 h-7 sm:w-8 sm:h-8 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-[#081221] font-bold text-xs">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-[#F8FAFC]">
                    {user.name}
                  </span>
                </div>

                <ul className="menu dropdown-content mt-3 w-60 p-3 bg-[#0D1B2A] border border-[#223753] rounded-xl shadow-2xl z-[100]">
                  <div className="px-3 py-2 border-b border-[#223753] mb-2">
                    <p className="font-semibold text-sm text-[#F8FAFC] truncate">{user.name}</p>
                    <p className="text-xs text-[#7C8BA1] truncate">{user.email}</p>
                  </div>
                  <li><Link href="/profile" className="text-[#B8C4D6] hover:text-[#3B82F6] py-2 text-sm">Profile</Link></li>
                  <li><Link href={dashboardLinks[user?.role || "user"]} className="text-[#B8C4D6] hover:text-[#3B82F6] py-2 text-sm">Dashboard</Link></li>
                  <div className="border-t border-[#223753] my-2"></div>
                  <li>
                    <button onClick={handleSignOut} className="text-red-400 hover:text-red-300 py-2 text-sm w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default NavbarDashboard