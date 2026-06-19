'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-[#081221] border-t border-[#223753] mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-5">

            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/logo.png"
                alt="Life Atlas"
                width={55}
                height={55}
              />

              <h2 className="text-2xl font-bold text-white">
                <span className="text-[#3B82F6]">Life</span> Atlas
              </h2>
            </div>

            <p className="text-[#B8C4D6] leading-7 max-w-md">
              Capture meaningful life lessons, organize personal growth,
              and share knowledge that helps others learn from real experiences.
            </p>

            <div className="flex items-center gap-3 mt-6">

              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#11243A] border border-[#223753]
                flex items-center justify-center hover:bg-[#3B82F6]
                hover:border-[#3B82F6] transition-all"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#11243A] border border-[#223753]
                flex items-center justify-center hover:bg-[#3B82F6]
                hover:border-[#3B82F6] transition-all"
              >
                <FaXTwitter />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#11243A] border border-[#223753]
                flex items-center justify-center hover:bg-[#3B82F6]
                hover:border-[#3B82F6] transition-all"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#11243A] border border-[#223753]
                flex items-center justify-center hover:bg-[#3B82F6]
                hover:border-[#3B82F6] transition-all"
              >
                <FaGithub />
              </Link>

            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-[#B8C4D6]">
              <li>
                <Link href="/" className="hover:text-[#3B82F6]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/public-lessons" className="hover:text-[#3B82F6]">
                  Public Lessons
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-[#3B82F6]">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-5">
              Contact
            </h3>

            <ul className="space-y-3 text-[#B8C4D6]">
              <li>support@lifeatlas.com</li>
              <li>+880 1234-567890</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-5">
              Legal
            </h3>

            <ul className="space-y-3 text-[#B8C4D6]">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#3B82F6]"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#3B82F6]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#223753] mt-14 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-[#7C8BA1]">
              © {new Date().getFullYear()} Life Atlas. All rights reserved.
            </p>

            <p className="text-sm text-[#7C8BA1]">
              Built for lifelong learning and growth.
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer