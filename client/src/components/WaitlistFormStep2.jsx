/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWaitlist } from "../context/WaitlistContext";
import { useLogo } from "../hooks/useLogo";
import { toast } from "sonner";

const roles = [
  {
    title: "College Student",
    desc: "Currently pursuing a degree in college",
    key: "college-details",
  },
  {
    title: "Aspirant",
    desc: "Currently studying in high school",
    key: "aspirant-details",
  },
  {
    title: "College Alumni",
    desc: "Completed studies, part of the alumni network",
    key: "alumni-details",
  },
];

const WaitlistFormStep2 = () => {
  const navigate = useNavigate();
  const { updateFormData } = useWaitlist();
  const { logoUrl, isLoading: logoLoading } = useLogo();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleSelect = (rolekey) => {
    setSelectedRole(rolekey);
    setShowWarning(false);
  };

  useEffect(() => {
    if (showWarning) {
      toast.warning("Please select a role to continue.");
    }
  }, [showWarning]);

  const handleContinue = () => {
    if (!selectedRole) {
      setShowWarning(true);
    } else {
      updateFormData({ role: selectedRole });
      navigate(`/${selectedRole}`);
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
              src={logoUrl || "/image.png"}
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
              style={{ width: "50%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Step 2 of 4 — 50% Complete
          </p>
        </div>

        {/* Role Selection */}
        <div className="text-left space-y-2">
          <h3 className="text-xl font-bold">What's your role?</h3>
          <p className="text-sm text-gray-300">
            This helps us personalize your Peerly experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((role, idx) => {
            const isSelected = selectedRole === role.key;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(role.key)}
                className={`p-4 rounded-lg cursor-pointer transition-all border text-left flex flex-col justify-center ${
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
