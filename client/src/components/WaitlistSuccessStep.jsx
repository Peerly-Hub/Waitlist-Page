/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { useWaitlist } from "../context/WaitlistContext";
import { toast } from "sonner";

const WaitlistSuccessStep = () => {
  const { formData } = useWaitlist();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-[#1b1b2f] p-8 rounded-2xl shadow-xl text-center border border-[#2c2c42] space-y-6"
      >
        {/* Welcome */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Welcome to Peerly,{" "}
            <span className="text-purple-400">{formData.name}</span>!
          </h2>
          <p className="text-sm text-gray-400">
            You're now part of the Peerly community 🚀
          </p>
        </div>

        <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center">
          <FaCheckCircle className="text-white text-3xl" />
        </div>

        <p className="text-base text-gray-300">
          Thank you for joining Peerly’s early waitlist. You’ll be notified when
          we launch your digital campus experience.
        </p>

        {/* Profile Summary */}
        <div className="bg-[#2a2a40] rounded-xl p-5 border border-[#3c3c58] text-left space-y-3">
          <h4 className="text-lg font-bold mb-2 text-white">
            Your Profile Summary
          </h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-white">Name:</span>{" "}
              {formData.name}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {formData.email}
            </p>
            {formData.role && (
              <p>
                <span className="font-semibold text-white">Role:</span>{" "}
                {formData.role}
              </p>
            )}
            {formData.college && (
              <p>
                <span className="font-semibold text-white">College:</span>{" "}
                {formData.college}
              </p>
            )}
            {formData.branch && (
              <p>
                <span className="font-semibold text-white">Branch:</span>{" "}
                {formData.branch}
              </p>
            )}
            {formData.gradYear && (
              <p>
                <span className="font-semibold text-white">Grad Year:</span>{" "}
                {formData.gradYear}
              </p>
            )}
          </div>
        </div>

        {/* Social Actions */}
        <div className="space-y-4">
          <p className="text-sm text-gray-400">Stay connected with us:</p>
          <div className="flex justify-center gap-6 text-xl">
            <a
              href="https://www.instagram.com/peerly.app?igsh=cWlkanBudWRnajVp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/peerlyapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbAnUy87oQhfrAw8C81p"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Referral Button */}
        <button
          onClick={() => toast.success("Referral feature coming soon!")}
          className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          Refer friends and move up the list!
        </button>
      </motion.div>
    </div>
  );
};

export default WaitlistSuccessStep;
