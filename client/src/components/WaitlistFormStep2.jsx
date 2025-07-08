/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWaitlist } from "../context/WaitlistContext";
import { useLogo } from "../hooks/useLogo";

const roles = [
  { title: "Learner", desc: "I want to develop real world skills" },
  {
    title: "Employer",
    desc: "I'm looking to hire interns or freelancers",
  },
  { title: "Freelancer", desc: "I'm looking for gigs and projects" },
  { title: "Mentor", desc: "I want to guide and support others" },
  { title: "Partner", desc: "I want to organize events or start clubs" },
  { title: "Creator", desc: "I want to share content or resources" },
];

const WaitlistFormStep2 = () => {
  const navigate = useNavigate();
  const { updateFormData } = useWaitlist();
  const { logoUrl, isLoading: logoLoading } = useLogo();
  const [selectedRole, setSelectedRole] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleSelect = (roleTitle) => {
    setSelectedRole(roleTitle);
    setShowWarning(false);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      setShowWarning(true);
    } else {
      updateFormData({ role: selectedRole });
      navigate("/profile-links");
    }
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
              style={{ width: "66.66%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Step 2 of 3 — 66% Complete
          </p>
        </div>

        {/* Role Selection */}
        <div className="text-left space-y-2">
          <h3 className="text-xl font-bold">What's your role?</h3>
          <p className="text-sm text-gray-300">
            This helps us personalize your Peerly experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role, idx) => {
            const isSelected = selectedRole === role.title;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(role.title)}
                className={`p-4 rounded-lg cursor-pointer transition-all border text-left ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent ring-2 ring-purple-400 opacity-95"
                    : "bg-[#2a2a40] border-gray-600 hover:border-purple-500"
                }`}
              >
                <h5 className="font-semibold text-white">{role.title}</h5>
                <p
                  className={`text-sm mt-1 ${
                    isSelected ? "text-white" : "text-gray-400"
                  }`}
                >
                  {role.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warning Text */}
        {showWarning && (
          <p className="text-red-400 text-sm text-center">
            Please select a role to continue.
          </p>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default WaitlistFormStep2;
