/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaMagic } from "react-icons/fa";
import { useWaitlist } from "../context/WaitlistContext"; // assuming you used Context

const WaitlistSuccessStep = () => {
  const { formData } = useWaitlist();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#1b1b2f] p-8 rounded-2xl shadow-xl text-center border border-[#2c2c42]"
      >
        <h2 className="text-2xl font-bold mb-1 text-white">Welcome aboard!</h2>
        <p className="text-sm text-gray-400 mb-6">
          You're now part of the Peerly community
        </p>

        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center">
          <FaCheckCircle className="text-white text-3xl" />
        </div>

        <h3 className="text-2xl font-extrabold text-blue-400 mb-2">
          You're In! 🎉
        </h3>
        <p className="text-base text-gray-300">
          Welcome to the Peerly community,{" "}
          <span className="font-semibold text-white">{formData.name}</span>!
        </p>
        <p className="text-sm text-gray-400 mt-1">
          We'll send early access details to{" "}
          <span className="text-white">{formData.email}</span>
        </p>

        <div className="mt-8 bg-[#2a2a40] rounded-xl p-5 border border-[#3c3c58]">
          <h4 className="text-lg font-bold mb-4 text-white">What's Next?</h4>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <FaMagic className="text-purple-400" />
              <span className="text-gray-300">Get notified when we launch</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMagic className="text-blue-400" />
              <span className="text-gray-300">
                Early access to all features
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMagic className="text-green-400" />
              <span className="text-gray-300">
                Boost your profile with early adopter badge
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistSuccessStep;
