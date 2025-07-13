/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Example college options
const colleges = [
  "IIT Bombay",
  "Delhi University",
  "VIT Vellore",
  "MIT Pune",
  "Other",
];
const courses = ["B.Tech", "B.Com", "BA", "BBA", "MBA", "M.Tech"];
const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const CollegeFormPage = () => {
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [stream, setStream] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!college || !course || !stream || !yearOfStudy) {
      toast.warning("Please fill in all the required fields.");
      return;
    }

    console.log("Submitted college form:", {
      college,
      course,
      stream,
      yearOfStudy,
    });

    toast.success("College details saved successfully!");
    navigate("/profile-links");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#1b1b2f] p-6 sm:p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            College <span className="text-purple-400">Student Details</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Help us personalize your Peerly experience.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Step 3 of 4 — 75% Complete
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* College Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              College <span className="text-red-500">*</span>
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            >
              <option value="">Select your college</option>
              {colleges.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            >
              <option value="">Select your course</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Stream */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Stream <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science, Finance, Psychology"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            />
          </div>

          {/* Year of Study Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Year of Study <span className="text-red-500">*</span>
            </label>
            <select
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            >
              <option value="">Select year</option>
              {studyYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CollegeFormPage;
