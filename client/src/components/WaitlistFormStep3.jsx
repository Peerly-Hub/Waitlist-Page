/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WaitlistFormStep3 = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type) &&
      file.size <= 5 * 1024 * 1024
    ) {
      setResumeFile(file);
    } else {
      alert("Please upload a valid resume (PDF, DOC, DOCX, max 5MB).");
    }
  };

  const handleSkip = () => navigate("/success");
  const handleCompleteProfile = () => navigate("/success");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#1b1b2f] p-6 sm:p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Logo */}
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">Logo</span>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">
            Join the <span className="text-purple-400">Peerly</span> Revolution
          </h2>
          <p className="text-sm text-gray-300">
            Be among the first to experience the future of Gen Z learning and
            collaboration.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Step 3 of 3 — 100% Complete
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2">
              Complete Your Professional Profile
            </h3>
            <p className="text-sm text-gray-300">
              Share your resume or professional links to help us understand your
              skills better.
            </p>
          </div>

          {/* Resume Upload */}
          <div>
            <h4 className="text-md font-semibold mb-2">Upload Your Resume</h4>
            <label
              htmlFor="resume-upload"
              className="flex items-center justify-center h-36 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-[#2a2a40] hover:border-purple-500 transition"
            >
              {resumeFile ? (
                <p className="text-sm text-gray-300">{resumeFile.name}</p>
              ) : (
                <div className="flex flex-col items-center space-y-2 text-center">
                  <FaUpload className="text-2xl text-purple-400" />
                  <p className="text-xs md:text-sm text-gray-400">
                    Click to browse or drag your file here
                  </p>
                  <span className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 5MB
                  </span>
                </div>
              )}
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Profile Links */}
          <div className="space-y-5">
            {/* LinkedIn */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                Personal Portfolio / Website
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleCompleteProfile}
              className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity"
            >
              Complete Profile
            </button>
            <button
              onClick={handleSkip}
              className="w-full py-2 text-sm text-gray-400 hover:text-white underline"
            >
              Skip for now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistFormStep3;
