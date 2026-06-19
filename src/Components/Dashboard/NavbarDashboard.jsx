'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { authClient } from '@/lib/auth-client'
import NavLink from '../NavLink'
import { FaCrown } from 'react-icons/fa'

const NavbarDashboard = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const isAdmin = user?.role === "admin"
  const isPremium = user?.plan === "premium"

  // ✅ Only normal users who are NOT premium
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

  const dashboardLink = isAdmin
    ? "/dashboard/admin"
    : "/dashboard/user"

  return (
    <div className="sticky top-0 py-2 z-50 w-full bg-[#081221]/90 backdrop-blur border-b border-[#223753]">
      <div className="navbar w-full px-4 lg:px-8 text-[#F8FAFC]">

        {/* LEFT / CENTER NAV */}
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal text-base font-semibold gap-4">

            <NavLink href="/"><li>Home</li></NavLink>
            <NavLink href="/alllessons"><li>All Lessons</li></NavLink>

            {/* ✅ ONLY USER CAN SEE THESE */}
            {user && !isAdmin && (
              <>
                <NavLink href="/dashboard/add-lesson">
                  <li>Add Lesson</li>
                </NavLink>

                <NavLink href="/dashboard/my-lessons">
                  <li>My Lessons</li>
                </NavLink>
              </>
            )}

          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          {!user ? (
            <ul className="menu menu-horizontal gap-2">
              <li>
                <Link
                  href="/login"
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-4 py-2 rounded-xl"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="bg-[#11243A] hover:bg-[#3B82F6] text-white px-4 py-2 rounded-xl border border-[#223753]"
                >
                  Signup
                </Link>
              </li>
            </ul>
          ) : (

            <div className="flex items-center gap-3">

              {/* ✅ UPGRADE ONLY FOR USER */}
              {showUpgrade && (
                <Link
                  href="/pricing"
                  className="btn btn-sm text-sm font-semibold bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#111827] border-none rounded-xl"
                >
                  <FaCrown />
                  Upgrade
                </Link>
              )}

              {/* USER DROPDOWN */}
              <div className="dropdown dropdown-end">

                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 bg-[#0D1B2A] border border-[#223753] px-3 py-2 rounded-xl"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user"
                      width={38}
                      height={38}
                      className="rounded-full border border-[#3B82F6]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#3B82F6] flex items-center justify-center text-[#081221] font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}

                  <span className="hidden md:block text-sm">
                    {user.name}
                  </span>
                </div>

                {/* DROPDOWN */}
                <ul className="menu dropdown-content mt-4 w-64 p-3 bg-[#0D1B2A] border border-[#223753] rounded-xl shadow-xl">

                  <div className="px-3 py-2 border-b border-[#223753] mb-2">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-[#7C8BA1]">{user.email}</p>
                  </div>

                  <li>
                    <Link href="/profile" className="text-[#B8C4D6] hover:text-[#3B82F6]">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link href={dashboardLink} className="text-[#B8C4D6] hover:text-[#3B82F6]">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link href="/alllessons" className="text-[#B8C4D6] hover:text-[#3B82F6]">
                      Public Lessons
                    </Link>
                  </li>

                  {/* optional upgrade inside dropdown */}
                  {showUpgrade && (
                    <li>
                      <Link href="/pricing" className="text-[#3B82F6] font-medium flex items-center gap-2">
                        <FaCrown />
                        Upgrade Plan
                      </Link>
                    </li>
                  )}

                  <div className="border-t border-[#223753] my-2"></div>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-400 hover:text-red-300"
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
  )
}

export default NavbarDashboard