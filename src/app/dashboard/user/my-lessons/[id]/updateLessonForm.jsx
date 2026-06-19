'use client';

import { useState } from "react";
import { FiSave, FiLock, FiUnlock } from "react-icons/fi";
import { toast } from "react-toastify";
import { updateLesson } from "@/lib/api/getAllLessons";

export default function UpdateLessonForm({
  id,
  lesson,
  user,
}) {
  const [loading, setLoading] = useState(false);

  const isPremium = user?.plan === "premium";

  const [access, setAccess] = useState(lesson?.access ?? "free");

const toggleAccess = () => {
  if (!isPremium) return;

  setAccess((prev) =>
    prev === "free" ? "premium" : "free"
  );
};
console.log("USER:", user);
console.log("PLAN:", user?.plan);
console.log("isPremium:", isPremium);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      tone: formData.get("tone"),
      image: formData.get("image"),
      access,
    };

    try {
      setLoading(true);

      const result = await updateLesson(
        id,
        payload
      );

      if (result.success) {
        toast.success("Lesson updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081221] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Update{" "}
            <span className="text-[#3B82F6]">
              Lesson
            </span>
          </h1>

          <p className="text-[#94A3B8] mt-2">
            Improve your lesson and help more people learn from your experience.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0D1B2A] border border-[#223753] rounded-3xl overflow-hidden"
        >
          <div className="p-8 space-y-8">

            {/* Title */}
            <div>
              <label className="block text-sm text-[#B8C4D6] mb-2">
                Lesson Title
              </label>

              <input
                name="title"
                defaultValue={lesson?.title}
                required
                className="input w-full bg-[#11243A] border-[#223753] text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-[#B8C4D6] mb-2">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={lesson?.description}
                rows={7}
                required
                className="textarea w-full bg-[#11243A] border-[#223753] text-white"
              />
            </div>

            {/* Category + Tone */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm text-[#B8C4D6] mb-2">
                  Category
                </label>

                <select
                  name="category"
                  defaultValue={lesson?.category}
                  className="select w-full bg-[#11243A] border-[#223753]"
                >
                  <option>Personal Growth</option>
                  <option>Career</option>
                  <option>Relationships</option>
                  <option>Mindset</option>
                  <option>Mistakes Learned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#B8C4D6] mb-2">
                  Emotional Tone
                </label>

                <select
                  name="tone"
                  defaultValue={lesson?.tone}
                  className="select w-full bg-[#11243A] border-[#223753]"
                >
                  <option>Motivational</option>
                  <option>Sad</option>
                  <option>Realization</option>
                  <option>Gratitude</option>
                </select>
              </div>

            </div>

            {/* Image */}
            <div>
              <label className="block text-sm text-[#B8C4D6] mb-2">
                Image URL
              </label>

              <input
                name="image"
                defaultValue={lesson?.image}
                className="input w-full bg-[#11243A] border-[#223753]"
              />
            </div>

            {/* Access Card */}
            <div className="bg-[#11243A] border border-[#223753] rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-lg">
                    Access Level
                  </h3>

                  <p className="text-sm text-[#94A3B8]">
                    Control who can view this lesson.
                  </p>
                </div>

               <button
  type="button"
  disabled={!isPremium}
  onClick={toggleAccess}
  className={`btn ${
    access === "premium"
      ? "bg-[#FBBF24] border-[#FBBF24] text-black"
      : "bg-[#3B82F6] border-[#3B82F6] text-white"
  }`}
>
  {access === "premium" ? (
    <>
      <FiLock />
      Premium
    </>
  ) : (
    <>
      <FiUnlock />
      Free
    </>
  )}
</button>

              </div>

              {!isPremium && (
                <p className="text-xs text-yellow-400 mt-3">
                  Upgrade to Premium to publish premium lessons.
                </p>
              )}
            </div>

            {/* User Info */}
            <div>
              <h3 className="font-semibold mb-4 text-[#B8C4D6]">
                Author Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-[#11243A] border border-[#223753] rounded-xl p-4">
                  <p className="text-xs text-gray-400">
                    User Name
                  </p>

                  <p className="font-medium mt-1">
                    {user?.name}
                  </p>
                </div>

                <div className="bg-[#11243A] border border-[#223753] rounded-xl p-4">
                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="font-medium mt-1">
                    {user?.email}
                  </p>
                </div>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] border-none text-white text-base font-semibold"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FiSave />
                  Update Lesson
                </>
              )}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}