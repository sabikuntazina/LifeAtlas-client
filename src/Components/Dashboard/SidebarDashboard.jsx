'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  FiMenu,
  FiHome,
  FiUser,
  FiUsers,
  FiHeart,
  FiFlag,
} from 'react-icons/fi'

import {
  MdOutlineLibraryBooks,
  MdOutlineManageAccounts,
} from 'react-icons/md'

import { IoAddCircleOutline } from 'react-icons/io5'
import { RiEdit2Line } from 'react-icons/ri'

import { authClient } from '@/lib/auth-client'

export default function SidebarDashboard() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const { data: session } = authClient.useSession()
  const user = session?.user

  const navLinks = {
    user: [
      { icon: FiHome, href: '/dashboard/user', label: 'Dashboard' },
      { icon: IoAddCircleOutline, href: '/dashboard/user/add-lesson', label: 'Add Lesson' },
      { icon: MdOutlineLibraryBooks, href: '/dashboard/user/my-lessons', label: 'My Lessons' },
      { icon: RiEdit2Line, href: '/dashboard/user/update-lesson', label: 'Update Lesson' },
      { icon: FiHeart, href: '/dashboard/user/favourites', label: 'My Favourites' },
      { icon: FiUser, href: '/dashboard/user/profile', label: 'Profile' },
    ],

    admin: [
      { icon: FiHome, href: '/dashboard/admin', label: 'Dashboard' },
      { icon: FiUsers, href: '/dashboard/admin/manage-users', label: 'Manage Users' },
      { icon: MdOutlineManageAccounts, href: '/dashboard/admin/manage-lessons', label: 'Manage Lessons' },
      { icon: FiFlag, href: '/dashboard/admin/reported-lessons', label: 'Reported Lessons' },
      { icon: FiUser, href: '/dashboard/admin/profile', label: 'Profile' },
    ],
  }

  const navItems =
    user?.role === 'admin'
      ? navLinks.admin
      : navLinks.user

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 border-b border-[#223753] bg-[#081221] lg:hidden">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-bold text-[#F8FAFC]">
            <span className="text-[#3B82F6]">Life</span>Atlas
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="btn btn-square btn-sm border-[#223753] bg-[#11243A] text-white"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:w-72 min-h-screen flex-col border-r border-[#223753] bg-[#0B1725]">

        {/* LOGO */}
        <div className="border-b border-[#223753] px-6 py-4">
          <h2 className="text-2xl font-bold text-[#F8FAFC]">
            <span className="text-[#3B82F6]">Life</span>Atlas
          </h2>

          <p className="mt-1 text-sm text-[#7C8BA1]">
            Personal Growth Dashboard
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">

            {navItems?.map((item) => {
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                      ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20'
                          : 'text-[#B8C4D6] hover:bg-[#11243A] hover:text-white'
                      }`}
                  >
                    <item.icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}

          </ul>
        </nav>

        {/* USER INFO */}
        <div className="border-t border-[#223753] p-4">
          <div className="rounded-xl bg-[#11243A] p-3">
            <p className="font-medium text-[#F8FAFC]">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-[#7C8BA1]">
              {user?.email || ''}
            </p>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          open ? 'visible' : 'invisible'
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[280px] bg-[#0B1725] border-r border-[#223753]
          transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >

          {/* same content */}
          <div className="border-b border-[#223753] px-6 py-6">
            <h2 className="text-2xl font-bold text-[#F8FAFC]">
              <span className="text-[#3B82F6]">Life</span>Atlas
            </h2>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">

              {navItems?.map((item) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                        ${
                          isActive
                            ? 'bg-[#2563EB] text-white'
                            : 'text-[#B8C4D6] hover:bg-[#11243A]'
                        }`}
                    >
                      <item.icon />
                      {item.label}
                    </Link>
                  </li>
                )
              })}

            </ul>
          </nav>

        </aside>
      </div>
    </>
  )
}