'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({ href, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`transition ${
        isActive ? "text-[#3B82F6]" : "text-[#B8C4D6]"
      } hover:text-[#3B82F6]`}
    >
      {children}
    </Link>
  )
}

export default NavLink