"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiLock, FiChevronDown, FiUpload, FiArrowRight, FiShield } from "react-icons/fi";
import { postLesson } from "@/lib/action/addLesson";
import { toast } from "react-toastify";
import Link from "next/link";

/* ------------------ CUSTOM SELECT COMPONENT ------------------ */
function CustomSelect({
  label,
  value,
  setValue,
  options,
  disabled = false,
  helper,
  lockedText,
  openDropdown,
  setOpenDropdown,
  id,
}) {
  return (
    <div className="space-y-2 relative">
      {/* LABEL */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#B8C4D6]">
          {label}
        </label>
        {helper && (
          <span className="text-xs text-[#7C8BA1]">{helper}</span>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          !disabled &&
          setOpenDropdown(openDropdown === id ? null : id)
        }
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
        ${
          disabled
            ? "bg-[#0b1622] border-[#223753] opacity-60 cursor-not-allowed"
            : "bg-[#11243A] border-[#223753] hover:border-[#3B82F6]"
        }`}
      >
        <span className="text-sm">{value}</span>
        <FiChevronDown />
      </button>

      {/* DROPDOWN */}
      {openDropdown === id && !disabled && (
        <div className="absolute z-20 mt-2 w-full bg-[#0D1B2A] border border-[#223753] rounded-xl overflow-hidden shadow-xl">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpenDropdown(null);
              }}
              className="px-4 py-3 hover:bg-[#11243A] cursor-pointer text-sm"
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {/* LOCK MESSAGE */}
      {disabled && lockedText && (
        <div className="flex items-center gap-2 text-yellow-400 text-xs">
          <FiLock />
          {lockedText}
        </div>
      )}
    </div>
  );
}

/* ------------------ MAIN PAGE ------------------ */
export default function AddLessonPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // প্রিমিয়াম চেক লক
  const isPremium = user?.plan === "premium";

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [category, setCategory] = useState("Personal Growth");
  const [tone, setTone] = useState("Motivational");
  const [visibility, setVisibility] = useState("public");
  const [access, setAccess] = useState("free");
  const [imageUrl, setImageUrl] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded");
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPremium) {
      toast.error("Premium access required!");
      return;
    }
    
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      category,
      tone,
      image: imageUrl,
      access: access, // প্রিমিয়াম ইউজার ইচ্ছামত free বা premium সিলেক্ট করতে পারবে
      visibility,
      creatorName: user?.name,
      creatorId: user?.id,
      creatorPlan: user?.plan,
      creatorRole: user?.role,
      creatorImg: user?.image,
    };

    const res = await postLesson(payload);

    if (res?.insertedId || res?.acknowledged) {
      toast.success("Lesson created!");
      e.target.reset();
      setImageUrl("");
      setVisibility("public");
      setAccess("free");
    } else {
      toast.error("Failed to create lesson");
    }

    setLoading(false);
  };

  // সেশন লোড হওয়ার সময় ব্লাঙ্ক বা কঙ্কাল স্টেট এড়াতে লোডার
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#081221] flex items-center justify-center text-[#7C8BA1]">
        <div className="animate-pulse font-mono text-sm">Validating Identity Matrix...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">
            Create a <span className="text-[#3B82F6]">Life Lesson</span>
          </h1>
          <p className="text-[#B8C4D6] mt-2">
            Share your experience and help others grow.
          </p>
        </div>

        {/* FORM CONTAINER WITH PREMIUM CONDITION */}
        {!isPremium ? (
          /* 🔒 PREMIUM UPGRADE CARD */
          <div className="bg-[#0D1B2A] border-2 border-dashed border-yellow-500/30 rounded-2xl p-10 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-400 border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
              <FiShield size={36} className="animate-pulse" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-black tracking-wide text-[#F8FAFC]">Premium Creator Access Required</h3>
              <p className="text-sm text-[#B8C4D6] leading-relaxed">
                Publishing lessons and creating collective wisdom is an exclusive premium tier feature. Upgrade your plan to open global creation access.
              </p>
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-[#081221] font-black text-sm rounded-xl transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-95 group"
            >
              Upgrade Plan Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          /* 📝 ACTUAL CREATION FORM */
          <form
            onSubmit={handleSubmit}
            className="relative bg-[#0D1B2A] border border-[#223753] rounded-2xl p-8 space-y-6 shadow-xl"
          >
            {/* TITLE */}
            <div className="space-y-2">
              <label className="text-sm text-[#B8C4D6] font-medium">
                Lesson Title
              </label>
              <input
                name="title"
                className="w-full px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl focus:outline-none focus:border-[#3B82F6] transition text-sm"
                placeholder="Give your lesson a meaningful title"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm text-[#B8C4D6] font-medium">
                Story / Insight
              </label>
              <textarea
                name="description"
                rows={6}
                className="w-full px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl focus:outline-none focus:border-[#3B82F6] transition text-sm"
                placeholder="Share your raw experiences, strategies or realisations here..."
                required
              />
            </div>

            {/* GRID (CATEGORY & TONE) */}
            <div className="grid md:grid-cols-2 gap-6">
              <CustomSelect
                label="Category"
                helper="Choose lesson type"
                value={category}
                setValue={setCategory}
                options={[
                  "Personal Growth",
                  "Career",
                  "Relationships",
                  "Mindset",
                  "Mistakes Learned",
                ]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                id="category"
              />

              <CustomSelect
                label="Emotional Tone"
                helper="How does it feel?"
                value={tone}
                setValue={setTone}
                options={[
                  "Motivational",
                  "Sad",
                  "Realization",
                  "Gratitude",
                ]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                id="tone"
              />
            </div>

            {/* IMAGE */}
            <div className="space-y-2">
              <label className="text-sm text-[#B8C4D6] font-medium">
                Upload Image
              </label>
              <label className="flex items-center gap-3 px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl cursor-pointer text-sm hover:border-[#3B82F6] transition-colors">
                <FiUpload className="text-[#3B82F6]" />
                <span className="text-[#B8C4D6]">
                  {uploading ? "Uploading..." : imageUrl ? "Change Image" : "Choose Image"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
              {imageUrl && (
                <p className="text-xs text-green-400 font-medium flex items-center gap-1">
                  ✓ Image uploaded successfully
                </p>
              )}
            </div>

            {/* VISIBILITY */}
            <CustomSelect
              label="Visibility"
              helper="Who can see this lesson?"
              value={visibility}
              setValue={setVisibility}
              options={["public", "private"]}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              id="visibility"
            />

            {/* ACCESS */}
            <CustomSelect
              label="Access Level"
              helper="Free or Premium lesson"
              value={access}
              setValue={setAccess}
              disabled={false} // প্রিমিয়াম ইউজার হওয়ার কারণে এটি অলওয়েজ আনলকড থাকবে
              options={["free", "premium"]}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              id="access"
            />

            {/* SUBMIT BUTTON */}
            <button
              disabled={loading || uploading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] font-bold text-sm shadow-xl shadow-blue-600/10 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Publish Lesson"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}