'use client'

import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import React, { useState } from "react"

import { FaGoogle } from "react-icons/fa"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IoMdLogIn } from "react-icons/io"
import { toast } from "react-toastify"


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    })


    if (data) {
      toast.success("Welcome to Life Atlas")
      router.push("/")
    }

    if (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081221] text-white px-4">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-[#0D1B2A] border border-[#223753] rounded-3xl overflow-hidden shadow-2xl">

        {/* ================= LEFT SIDE (UNCHANGED STYLE) ================= */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-[#0D1B2A] to-[#081221]">

          <div className="flex items-center gap-3 mb-10">
            <Image src="/assets/logo.png" alt="logo" width={60} height={60} />

            <h1 className="text-3xl font-bold">
              <span className="text-[#3B82F6]">Life</span> Atlas
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Welcome Back <br />
            to Your <br />
            <span className="text-[#3B82F6] italic">Learning Universe</span>
          </h2>

          <p className="mt-6 text-[#B8C4D6] text-lg">
            Manage your lessons, track your progress, and grow your knowledge
            with structured learning paths designed for focus and clarity.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="btn bg-[#2563EB] hover:bg-[#3B82F6] text-white border-none rounded-xl">
              Explore Lessons
            </button>

            <button className="btn btn-outline border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded-xl">
              Create Account
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE (UPDATED LOGIN) ================= */}
        <div className="flex items-center justify-center p-8 md:p-14 bg-[#081221]">

          <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center lg:text-left mb-8">

              <div className="flex justify-center lg:justify-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#11243A] flex items-center justify-center border border-[#223753]">
                  <span className="text-[#3B82F6] font-bold"><IoMdLogIn />
</span>
                </div>
              </div>

              <h2 className="text-4xl font-bold">Login</h2>
              <p className="text-[#7C8BA1] mt-2">
                Continue your journey in Life Atlas
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={onSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input w-full mt-1 bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Password</label>

                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input w-full bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8BA1] hover:text-[#3B82F6]"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button className="btn w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white border-none rounded-xl">
                Login
              </button>

              {/* DIVIDER */}
              <div className="divider text-[#7C8BA1]">OR</div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="btn w-full bg-white text-black hover:bg-gray-100 rounded-xl flex items-center gap-2"
              >
                <FaGoogle />
                Continue with Google
              </button>

            </form>

            {/* REGISTER LINK */}
            <p className="text-center text-[#7C8BA1] mt-6 text-sm">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#3B82F6] hover:underline">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage