"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiLock, FiChevronDown, FiUpload } from "react-icons/fi";
import { postLesson } from "@/lib/action/addLesson";
import { toast } from "react-toastify";

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
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isPremium = user?.plan === "premium";

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [category, setCategory] = useState("Personal Growth");
  const [tone, setTone] = useState("Motivational");

  // ✅ NEW FIELD: visibility
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
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      category,
      tone,
      image: imageUrl,
      access: isPremium ? access : "free",
      visibility,
      creatorName:user?.name,
      creatorId:user?.id,
      creatorPlan: user?.plan,
      creatorRole:user?.role,
      creatorImg:user?.image,
      
    };

    // console.log(payload);

    const res = await postLesson(payload);

    if (res?.insertedId || res?.acknowledged) {
      toast.success("Lesson created!");
      e.target.reset();
      setImageUrl("");
      setVisibility("public");
    } else {
      toast.error("Failed to create lesson");
    }

    setLoading(false);
  };

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

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-[#0D1B2A] border border-[#223753] rounded-2xl p-8 space-y-6"
        >

          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm text-[#B8C4D6]">
              Lesson Title
            </label>

            <input
              name="title"
              className="w-full px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl focus:outline-none focus:border-[#3B82F6] transition"
              placeholder="Give your lesson a meaningful title"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            rows={6}
            className="w-full px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl focus:outline-none focus:border-[#3B82F6] transition"
            placeholder="Story / Insight"
          />

          {/* GRID */}
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
            <label className="text-sm text-[#B8C4D6]">
              Upload Image
            </label>

            <label className="flex items-center gap-3 px-4 py-3 bg-[#11243A] border border-[#223753] rounded-xl cursor-pointer">
              <FiUpload />
              {uploading ? "Uploading..." : "Choose Image"}

              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {imageUrl && (
              <p className="text-xs text-green-400">
                Image uploaded successfully
              </p>
            )}
          </div>

            {/* VISIBILITY (NEW DROPDOWN) */}
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
            disabled={!isPremium}
            lockedText="Upgrade to Premium to unlock this"
            options={["free", "premium"]}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            id="access"
          />

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] font-medium"
          >
            {loading ? "Creating..." : "Publish Lesson"}
          </button>

        </form>
      </div>
    </div>
  );
}