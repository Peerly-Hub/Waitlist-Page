/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const targetedExamsOptions = [
  "JEE",
  "NEET",
  "CUET",
  "SAT",
  "NDA",
  "Boards",
  "Other",
];
const streamOptions = ["PCM", "PCB", "Commerce", "Humanities"];

const AspirantFormPage = () => {
  const navigate = useNavigate();

  const [stream, setStream] = useState("");
  const [targetedExams, setTargetedExams] = useState([]);
  const [futureInterest, setFutureInterest] = useState("");
  const [gradYear, setGradYear] = useState("");

  const handleExamChange = (exam) => {
    setTargetedExams((prev) =>
      prev.includes(exam) ? prev.filter((e) => e !== exam) : [...prev, exam]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !stream ||
      targetedExams.length === 0 ||
      !futureInterest.trim() ||
      !gradYear.trim()
    ) {
      toast.warning("Please fill out all required fields before continuing.");
      return;
    }

    toast.success("Aspirant details saved successfully!");
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
            High School{" "}
            <span className="text-purple-400">Aspirant Details</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Tell us about your academic goals.
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
          {/* Stream Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Current Stream <span className="text-red-500">*</span>
            </label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            >
              <option value="">Select your stream</option>
              {streamOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Targeted Exams Multi-Select */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Targeted Exams <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {targetedExamsOptions.map((exam) => (
                <label key={exam} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={exam}
                    checked={targetedExams.includes(exam)}
                    onChange={() => handleExamChange(exam)}
                    className="accent-purple-500 w-5 h-5"
                  />
                  <span className="text-base">{exam}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Future Career Interest */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Future Career Interest <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Engineering, Medicine, Business, Arts"
              value={futureInterest}
              onChange={(e) => setFutureInterest(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            />
          </div>

          {/* Passing Year */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Expected Passing Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2025"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              min="2024"
              max="2035"
              required
            />
          </div>

          {/* Submit */}
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

export default AspirantFormPage;
