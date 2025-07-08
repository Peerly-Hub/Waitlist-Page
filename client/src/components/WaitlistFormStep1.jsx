/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWaitlist } from "../context/WaitlistContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLogo } from "../hooks/useLogo";

const WaitlistFormStep1 = () => {
  const navigate = useNavigate();
  const { updateFormData } = useWaitlist();
  const { logoUrl, isLoading: logoLoading } = useLogo();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setErrors] = useState({ name: "", email: "", contact: "" });
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExistsMessage, setEmailExistsMessage] = useState("");

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", contact: "" };

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

  const checkEmailExists = async (emailToCheck) => {
    try {
      const q = query(
        collection(db, "waitlist"), 
        where("email", "==", emailToCheck.toLowerCase().trim())
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleContinue = async () => {
    // Clear previous messages
    setEmailExistsMessage("");
    
    if (validate()) {
      setIsCheckingEmail(true);
      
      try {
        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        
        if (emailExists) {
          setEmailExistsMessage("Your request already exists. We will get back to you soon!");
          setIsCheckingEmail(false);
          return;
        }
        
        // If email doesn't exist, proceed
        updateFormData({ name, email: email.toLowerCase().trim(), contact });
        navigate("/your-role");
      } catch (error) {
        console.error("Error during email check:", error);
        setEmailExistsMessage("Something went wrong. Please try again.");
      } finally {
        setIsCheckingEmail(false);
      }
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
        <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center">
          {logoLoading ? (
            <div className="animate-pulse bg-gray-600 w-full h-full rounded"></div>
          ) : logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Peerly Logo" 
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-white font-bold text-lg sm:text-2xl">Logo</span>
          )}
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

          {/* Email Exists Message */}
          {emailExistsMessage && (
            <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm text-center">{emailExistsMessage}</p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleContinue}
            disabled={isCheckingEmail}
            className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isCheckingEmail ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistFormStep1;
