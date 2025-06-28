/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWaitlist } from "../context/WaitlistContext";

const WaitlistFormStep1 = () => {
  const navigate = useNavigate();
  const { updateFormData } = useWaitlist();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setErrors] = useState({ name: "", email: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "" };

    if (name.trim() === "") {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      valid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net)$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (contact.trim() !== "") {
      const contactDigits = contact.replace(/\D/g, "");
      if (!/^\d{10}$/.test(contactDigits)) {
        newErrors.contact = "Enter a valid 10-digit phone number.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleContinue = () => {
    if (validate()) {
      updateFormData({ name, email });
      navigate("/your-role");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b15] to-[#14142b] text-white px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#1b1b2f] p-6 sm:p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-white font-bold text-lg sm:text-2xl">Logo</span>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            Join the <span className="text-purple-400">Peerly</span> Revolution
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Be among the first to experience the future of Gen Z learning and
            collaboration.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{ width: "33.33%" }}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Step 1 of 3 — 33% Complete
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              What's your name? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Contact Number <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
            />
            {errors.contact && (
              <p className="text-red-400 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleContinue}
            className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistFormStep1;
