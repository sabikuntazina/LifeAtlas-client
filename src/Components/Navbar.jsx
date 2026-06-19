'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoSunnySharp } from "react-icons/io5"

import { authClient } from '@/lib/auth-client'
import NavLink from './NavLink'
import { GiArmorUpgrade } from 'react-icons/gi'
import { FaCrown } from 'react-icons/fa'

const Navbar = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  // ✅ YOUR REQUIRED LOGIC
  const showUpgrade = user?.plan !== "premium"

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"
        }
      }
    })
  }

  return (
    <div className="sticky top-0 z-50 bg-[#081221]/90 backdrop-blur border-b border-[#223753]">
      <div className="navbar max-w-6xl mx-auto text-[#F8FAFC]">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="logo" width={50} height={50} />

            <Link href="/" className="text-xl font-bold">
              <span className="text-[#3B82F6]">LIFE</span>ATLAS
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-base font-semibold gap-4">

            <NavLink href="/"><li>Home</li></NavLink>
            <NavLink href="/public-lessons"><li>All Lessons</li></NavLink>

            {user && (
              <>
                <NavLink href="/dashboard/add-lesson"><li>Add Lesson</li></NavLink>
                <NavLink href="/dashboard/my-lessons"><li>My Lessons</li></NavLink>
              </>
            )}

          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          <div className="flex items-center gap-3">

            {/* NOT LOGGED IN */}
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

              /* LOGGED IN */
              <div className="flex items-center gap-3">

                {/* ✅ UPGRADE BUTTON FIXED */}
                {showUpgrade && (
                  <Link
                    href="/pricing"
                    className="btn btn-sm text-lg font-semibold bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D97706] text-[#111827] border-none rounded-xl"
                  >
                    <FaCrown />Upgrade
                  </Link>
                )}

                {/* USER DROPDOWN */}
                <div className="dropdown dropdown-end">

                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-3 bg-[#0D1B2A] border border-[#223753] px-3 py-2 rounded-xl hover:border-[#3B82F6] transition-all"
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

                    <span className="hidden md:block text-sm text-[#F8FAFC]">
                      {user.name}
                    </span>
                  </div>

                  {/* DROPDOWN MENU */}
                  <ul className="menu dropdown-content mt-4 w-64 p-3 bg-[#0D1B2A] border border-[#223753] rounded-xl shadow-xl">

                    <div className="px-3 py-2 border-b border-[#223753] mb-2">
                      <p className="text-[#F8FAFC] font-semibold">
                        {user.name}
                      </p>

                      <p className="text-xs text-[#7C8BA1]">
                        {user.email}
                      </p>
                    </div>

                    <li>
                      <Link href="/profile" className="text-[#B8C4D6] hover:text-[#3B82F6]">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link href="/dashboard" className="text-[#B8C4D6] hover:text-[#3B82F6]">
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link href="/public-lessons" className="text-[#B8C4D6] hover:text-[#3B82F6]">
                        Public Lessons
                      </Link>
                    </li>

                    {/* optional upgrade inside dropdown */}
                    {showUpgrade && (
                      <li>
                        <Link href="/pricing" className="text-[#3B82F6] font-medium">
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
    </div>
  )
}

export default Navbar