import Link from "next/link";
import { createSubscriptionData } from "@/lib/action/subscription";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await createSubscriptionData({
      ...metadata,
      sessionId: session_id,
    });

    return (
      <div className="min-h-screen bg-[#081221] flex items-center justify-center px-4">
        <div className="card w-full max-w-2xl bg-[#0D1B2A] border border-[#223753] shadow-2xl">

          <div className="card-body text-center">

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <FaCheckCircle className="text-6xl text-green-500" />
              </div>
            </div>

            {/* Badge */}
            <div className="mt-6">
              <span className="badge badge-lg bg-[#FBBF24] text-[#111827] border-none gap-2 px-4 py-4">
                <FaCrown />
                Premium Activated
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold text-white">
              Payment Successful 🎉
            </h1>

            <p className="text-[#B8C4D6] text-lg mt-3">
              Thank you for upgrading to the Premium Plan.
            </p>

            {/* Email */}
            <div className="mt-6 rounded-xl bg-[#11243A] border border-[#223753] p-4">
              <p className="text-sm text-[#7C8BA1]">
                Confirmation email sent to
              </p>

              <p className="text-[#3B82F6] font-semibold break-all mt-1">
                {customerEmail}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 text-left bg-[#11243A] rounded-xl p-5 border border-[#223753]">
              <h3 className="font-semibold text-white mb-3">
                Your Premium Benefits
              </h3>

              <ul className="space-y-2 text-[#B8C4D6]">
                <li>✅ Unlimited lesson creation</li>
                <li>✅ Unlimited favorites</li>
                <li>✅ Priority access to new features</li>
                <li>✅ Premium badge on your profile</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="card-actions justify-center mt-8 gap-4">

              <Link
                href="/dashboard"
                className="btn bg-[#2563EB] hover:bg-[#3B82F6] border-none text-white"
              >
                Go To Dashboard
              </Link>

              <Link
                href="/public-lessons"
                className="btn btn-outline border-[#3B82F6] text-[#3B82F6]"
              >
                Explore Lessons
              </Link>

            </div>

          </div>
        </div>
      </div>
    );
  }
}