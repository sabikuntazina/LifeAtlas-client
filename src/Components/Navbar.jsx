'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi' // 👈 হ্যামবার্গার আইকন ইম্পোর্ট করা হয়েছে
import { usePathname } from 'next/navigation'

import { authClient } from '@/lib/auth-client'
import NavLink from './NavLink'

const Navbar = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const pathname = usePathname()

  if (pathname.includes('dashboard')) {
    return null
  }

  const isPremium = user?.plan === "premium"
  const isAdmin = user?.role === "admin"

  const showUpgrade = user && !isPremium && !isAdmin

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


  const renderNavLinks = () => (
    <>
      <NavLink href="/"><li>Home</li></NavLink>
      <NavLink href="/alllessons"><li>All Lessons</li></NavLink>
      {user && !isAdmin && (
        <>
          <NavLink href="/dashboard/user/add-lesson"><li>Add Lesson</li></NavLink>
          <NavLink href="/dashboard/user/my-lessons"><li>My Lessons</li></NavLink>
        </>
      )}
    </>
  )

  return (
    <div className="sticky top-0 z-50 bg-[#081221]/90 backdrop-blur border-b border-[#223753]">
      <div className="navbar max-w-6xl mx-auto text-[#F8FAFC] px-4">

        {/* 📱 MOBILE: LEFT HAMBURGER MENU */}
        <div className="navbar-start flex lg:hidden">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="p-2 text-[#8CA0B8] hover:text-white rounded-xl bg-[#0D1B2A] border border-[#223753]"
            >
              <FiMenu size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-2xl bg-[#0D1B2A] border border-[#223753] rounded-xl w-56 gap-2"
            >
              {renderNavLinks()}
            </ul>
          </div>
        </div>

        {/* 💻 DESKTOP: LEFT BRAND LOGO */}
        <div className="navbar-start hidden lg:flex items-center gap-2">
          <Image src="/assets/logo.png" alt="logo" width={42} height={42} className="object-contain" />
          <Link href="/" className="text-xl font-bold tracking-wide">
            <span className="text-[#3B82F6]">LIFE</span>ATLAS
          </Link>
        </div>

        {/* 💻 DESKTOP: CENTER NAVIGATION LINKS */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-base font-semibold gap-4 p-0">
            {renderNavLinks()}
          </ul>
        </div>

        {/* 📱 MOBILE: CENTER BRAND LOGO  */}
        <div className="navbar-center flex lg:hidden items-center gap-1.5">
          <Image src="/assets/logo.png" alt="logo" width={32} height={32} className="object-contain" />
          <Link href="/" className="md:text-lg font-bold tracking-wide">
            <span className="text-[#3B82F6]">Life</span>Atlas
          </Link>
        </div>

        {/* 🔒 RIGHT: AUTH ACTIONS / PROFILE DROPDOWN */}
        <div className="navbar-end">
          <div className="flex items-center gap-2 sm:gap-3">

            {/* NOT LOGGED IN */}
            {!user ? (
              <ul className="menu menu-horizontal gap-2 p-0">
                <li>
                  <Link
                    href="/login"
                    className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-[#11243A] hover:bg-[#3B82F6] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hidden md:inline border border-[#223753] text-xs sm:text-sm font-medium transition-colors"
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            ) : (

              /* LOGGED IN */
              <div className="flex items-center gap-2 sm:gap-3">

                {/* UPGRADE BUTTON (USER ONLY) */}
                {showUpgrade && (
                  <Link
                    href="/pricing"
                    className="btn btn-sm text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D97706] text-[#111827] border-none rounded-xl px-2 sm:px-4"
                  >
                    <FaCrown />
                    <span className="hidden sm:inline">Upgrade</span>
                  </Link>
                )}

                {/* USER DROPDOWN */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 sm:gap-3 bg-[#0D1B2A] border border-[#223753] px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl hover:border-[#3B82F6] transition-all active:scale-95"
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
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-[#081221] font-bold text-xs sm:text-sm">
                        {user?.name?.charAt(0)}
                      </div>
                    )}

                    <span className="hidden md:block text-sm font-medium text-[#F8FAFC]">
                      {user.name}
                    </span>
                  </div>

                  {/* DROPDOWN MENU */}
                  <ul className="menu dropdown-content mt-4 w-64 p-3 bg-[#0D1B2A] border border-[#223753] rounded-xl shadow-2xl z-[100]">
                    <div className="px-3 py-2 border-b border-[#223753] mb-2">
                      <p className="text-[#F8FAFC] font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-[#7C8BA1] truncate">{user.email}</p>
                    </div>

                    <li>
                      <Link href="/profile" className="text-[#B8C4D6] hover:text-[#3B82F6] py-2 text-sm">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link href={dashboardLinks[user?.role || "user"]} className="text-[#B8C4D6] hover:text-[#3B82F6] py-2 text-sm">
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link href="/alllessons" className="text-[#B8C4D6] hover:text-[#3B82F6] py-2 text-sm">
                        Public Lessons
                      </Link>
                    </li>

                    {showUpgrade && (
                      <li>
                        <Link href="/pricing" className="text-[#3B82F6] font-medium flex items-center gap-2 py-2 text-sm">
                          <FaCrown />
                          Upgrade Plan
                        </Link>
                      </li>
                    )}

                    <div className="border-t border-[#223753] my-2"></div>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-red-400 hover:text-red-300 py-2 text-sm w-full text-left"
                      >
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
    </div>
  )
}

export default Navbar