'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import {
  FiHome,
  FiUser,
  FiUsers,
  FiHeart,
  FiFlag,
  FiX,
} from 'react-icons/fi'

import {
  MdOutlineLibraryBooks,
  MdOutlineManageAccounts,
} from 'react-icons/md'

import { IoAddCircleOutline as AddIcon } from 'react-icons/io5'
import { RiEdit2Line } from 'react-icons/ri'

import { authClient } from '@/lib/auth-client'

export default function SidebarDashboard() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const { data: session } = authClient.useSession()
  const user = session?.user


  useEffect(() => {
    const handleToggle = (e) => setOpen(e.detail)
    window.addEventListener('toggle-sidebar', handleToggle)
    return () => window.removeEventListener('toggle-sidebar', handleToggle)
  }, [])

  const navLinks = {
    user: [
      { icon: FiHome, href: '/dashboard/user', label: 'Dashboard' },
      { icon: AddIcon, href: '/dashboard/user/add-lesson', label: 'Add Lesson' },
      { icon: MdOutlineLibraryBooks, href: '/dashboard/user/my-lessons', label: 'My Lessons' },
      { icon: FiHeart, href: '/dashboard/user/my-favorites', label: 'My Favourites' },
      { icon: FiUser, href: '/profile', label: 'Profile' },
    ],
    admin: [
      { icon: FiHome, href: '/dashboard/admin', label: 'Dashboard' },
      { icon: FiUsers, href: '/dashboard/admin/manage-users', label: 'Manage Users' },
      { icon: MdOutlineManageAccounts, href: '/dashboard/admin/manage-lessons', label: 'Manage Lessons' },
      { icon: FiFlag, href: '/dashboard/admin/reported-lessons', label: 'Reported Lessons' },
      { icon: FiUser, href: '/profile', label: 'Profile' },
    ],
  }

  const navItems = user?.role === 'admin' ? navLinks.admin : navLinks.user

  const renderNavItems = () => navItems?.map((item) => {
    const isActive = pathname === item.href
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={() => setOpen(false)}
          className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
            isActive
              ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20'
              : 'text-[#B8C4D6] hover:bg-[#11243A] hover:text-white'
          }`}
        >
          <item.icon className="text-xl" />
          <span className="font-medium text-sm sm:text-base">{item.label}</span>
        </Link>
      </li>
    )
  })

  return (
    <>
      {/* 💻 DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:w-72 min-h-screen flex-col border-r border-[#223753] bg-[#0B1725] shrink-0">
        <div className="border-b border-[#223753] px-6 py-5">
          <h2 className="text-2xl font-bold text-[#F8FAFC]">
            <span className="text-[#3B82F6]">Life</span>Atlas
          </h2>
          <p className="mt-1 text-xs text-[#7C8BA1]">Personal Growth Dashboard</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1.5">{renderNavItems()}</ul>
        </nav>

        <div className="border-t border-[#223753] p-4">
          <div className="rounded-xl bg-[#11243A] p-3 border border-[#223753]/40">
            <p className="font-medium text-sm text-[#F8FAFC] truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-[#7C8BA1] truncate">{user?.email || ''}</p>
          </div>
        </div>
      </aside>

      {/* 📱 MOBILE DRAWER SIDEBAR */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all ${open ? 'visible' : 'invisible'}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[240px] bg-[#0B1725] border-r border-[#223753] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="border-b border-[#223753] px-4 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#F8FAFC]">
              <span className="text-[#3B82F6]">Life</span>Atlas
            </h2>
            <button 
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg bg-[#11243A] text-[#7C8BA1] hover:text-white border border-[#223753]"
            >
              <FiX size={16} />
            </button>
          </div>

          <nav className="flex-1 p-3 overflow-y-auto">
            <ul className="space-y-1">{renderNavItems()}</ul>
          </nav>

          <div className="border-t border-[#223753] p-3 bg-[#081221]/50">
            <div className="rounded-xl bg-[#11243A] p-2.5 border border-[#223753]/30">
              <p className="font-medium text-xs text-[#F8FAFC] truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-[#7C8BA1] truncate">{user?.email || ''}</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}