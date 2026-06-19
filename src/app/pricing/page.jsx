'use client'

import React from 'react'
import {
  FaCheck,
  FaCrown,
  FaBolt,
  FaStar,
  FaRegSmile,
} from 'react-icons/fa'

const features = [
  { label: 'Lesson Creation', free: '5 Lessons', premium: 'Unlimited' },
  { label: 'Premium Lessons Access', free: 'No', premium: 'Yes' },
  { label: 'Ads Experience', free: 'Ads Included', premium: 'Ad-Free' },
  { label: 'Public Ranking Priority', free: 'Low', premium: 'High Priority' },
  { label: 'Premium Content Access', free: 'Limited', premium: 'Full Access' },
  { label: 'Community Badge', free: 'None', premium: 'Verified Badge' },
]

export default function PricingPage() {

  const PRICE= '1500'


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070B1A] via-[#0B1220] to-[#070B1A] text-white px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-14">
        <div className="flex justify-center items-center gap-3 text-yellow-400">
          <FaCrown className="text-3xl" />
          <h1 className="text-4xl font-bold">
            Upgrade Your Experience
          </h1>
        </div>

        <p className="text-gray-400 mt-3">
          Unlock premium power, remove limits, and grow faster 🚀
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* FREE (IMPROVED) */}
        <div className="relative bg-[#0B1220] border border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-gray-800 transition">

          {/* header badge */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaRegSmile className="text-gray-400" />
              Free Plan
            </h2>

            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Current
            </span>
          </div>

          {/* price */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-200">
              ৳0
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Start for free, upgrade anytime
            </p>
          </div>

          {/* features */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{f.label}</span>
                <span className="text-gray-400">{f.free}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="w-full mt-8 py-3 rounded-xl border border-gray-700 text-gray-400 cursor-not-allowed">
            Your Current Plan
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            No payment required
          </p>
        </div>

        {/* PREMIUM (UNCHANGED BUT DOMINANT) */}
        <div className="relative bg-gradient-to-b from-[#1D4ED8]/20 to-[#0F172A] border border-blue-600 rounded-2xl p-8 shadow-[0_0_35px_rgba(59,130,246,0.25)]">

          {/* badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <FaBolt />
            Most Popular
          </div>

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-400">
            <FaCrown />
            Premium Plan
          </h2>

          {/* price */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white">
              ৳1500
            </h1>
            <p className="text-gray-400 mt-2">
              One-time payment • Lifetime access
            </p>
          </div>

          {/* features */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{f.label}</span>
                <span className="text-blue-400 flex items-center gap-2">
                  <FaCheck className="text-green-400" />
                  {f.premium}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" value={PRICE} name='price' />
              <button type='submit' 
            className="w-full mt-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <FaCrown />
            Upgrade Now
          </button>

          </form>
         

          <p className="text-center text-gray-500 text-sm mt-3">
            Secure payment via Stripe
          </p>
        </div>
      </div>
    </div>
  )
}