/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWaitlist } from "../context/WaitlistContext";
import { useLogo } from "../hooks/useLogo";

const WaitlistFormStep3 = () => {
  const navigate = useNavigate();
  const { updateFormData, submitToFirebase, isLoading, error } = useWaitlist();
  const { logoUrl, isLoading: logoLoading } = useLogo();
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

  const handleSkip = async () => {
    // Update form data without profile info and submit
    updateFormData({ 
      resume: null, 
      linkedIn: "", 
      portfolio: "" 
    });
    
    // Use setTimeout to ensure state is updated before submission
    setTimeout(async () => {
      const result = await submitToFirebase();
      if (result.success) {
        navigate("/success");
      }
    }, 100);
  };
  
  const handleCompleteProfile = async () => {
    // Update form data with all profile info and submit
    updateFormData({ 
      resume: resumeFile, 
      linkedIn, 
      portfolio 
    });
    
    // Use setTimeout to ensure state is updated before submission
    setTimeout(async () => {
      const result = await submitToFirebase();
      if (result.success) {
        navigate("/success");
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#1b1b2f] p-6 sm:p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Logo */}
        <div className="w-48 h-48 mx-auto flex items-center justify-center">
          {logoLoading ? (
            <div className="animate-pulse bg-gray-600 w-full h-full rounded"></div>
          ) : logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Peerly Logo" 
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-white font-bold text-2xl">Logo</span>
          )}
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

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleCompleteProfile}
              disabled={isLoading}
              className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {resumeFile ? "Uploading resume & submitting..." : "Submitting..."}
                </>
              ) : (
                "Complete Profile"
              )}
            </button>
            <button
              onClick={handleSkip}
              disabled={isLoading}
              className="w-full py-2 text-sm text-gray-400 hover:text-white underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Skip for now"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistFormStep3;
