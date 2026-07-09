'use client'

import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { FiUserPlus } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const RegisterPage = () => {
  const [error, setError] = useState("")
 
  const router = useRouter()
  //  const [loading,setLoading]=useState(false)
  const handleRegister = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())

    const password = user.password

    // ✅ Validation FIRST (important fix)
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.")
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.")
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.")
    }

    setError("")

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      role: "user",
      plan: "free",
    })

    if (data) {
      toast.success("Welcome to Life Atlas 🚀")
      router.push("/login")
    }

    if (error) {
      toast.error(error.message || "Something went wrong")
    }
  }

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081221] text-white px-4 py-10">

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
            Join Your <br />
            <span className="text-[#3B82F6] italic">Learning Universe</span>
          </h2>

          <p className="mt-6 text-[#B8C4D6] text-lg">
            Create your account and unlock structured learning paths, track progress,
            and build your knowledge system.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="btn bg-[#2563EB] hover:bg-[#3B82F6] text-white border-none rounded-xl">
              Explore Lessons
            </button>

            <button className="btn btn-outline border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded-xl">
              Become Instructor
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE (UPDATED REGISTER) ================= */}
        <div className="flex items-center justify-center p-8 md:p-14 bg-[#081221]">

          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="mb-8 text-center lg:text-left">

              <div className="flex justify-center lg:justify-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#11243A] flex items-center justify-center border border-[#223753]">
                  <FiUserPlus className="text-[#3B82F6] text-xl" />
                </div>
              </div>

              <h2 className="text-4xl font-bold">Create Account</h2>
              <p className="text-[#7C8BA1] mt-2">
                Start your learning journey today
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleRegister} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="input w-full mt-1 bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="input w-full mt-1 bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Photo URL</label>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="input w-full mt-1 bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-[#B8C4D6]">Password</label>

                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="input w-full mt-1 bg-[#0D1B2A] border border-[#223753] text-white rounded-xl focus:border-[#3B82F6] focus:outline-none"
                />

                {/* RULES */}
                <div className="mt-2 text-xs text-[#7C8BA1] space-y-1">
                  <p>• At least 6 characters</p>
                  <p>• One uppercase letter</p>
                  <p>• One lowercase letter</p>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* REGISTER BUTTON */}
              <button className="btn w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white border-none rounded-xl">
                Create Account
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

            {/* LOGIN LINK */}
            <p className="text-center text-[#7C8BA1] mt-6 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#3B82F6] hover:underline">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage