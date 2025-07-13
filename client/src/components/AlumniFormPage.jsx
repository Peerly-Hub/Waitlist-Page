import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AlumniFormPage = () => {
  const navigate = useNavigate();

  const [qualification, setQualification] = useState("");
  const [ugCollege, setUgCollege] = useState("");
  const [ugCourse, setUgCourse] = useState("");
  const [pgCollege, setPgCollege] = useState("");
  const [pgCourse, setPgCourse] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [gradYear, setGradYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Alumni Info Submitted:", {
      qualification,
      ugCollege,
      ugCourse,
      pgCollege,
      pgCourse,
      company,
      role,
      gradYear,
    });

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
            Alumni <span className="text-purple-400">Details</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Help us understand your academic and professional background.
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
          {/* Highest Qualification */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Highest Qualification <span className="text-red-500">*</span>
            </label>
            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              required
            >
              <option value="">Select your qualification</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>

          {/* UG Details */}
          {qualification === "UG" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  UG College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. IIT Delhi"
                  value={ugCollege}
                  onChange={(e) => setUgCollege(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  UG Course / Branch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech CSE"
                  value={ugCourse}
                  onChange={(e) => setUgCourse(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>
            </>
          )}

          {/* PG Details */}
          {qualification === "PG" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  PG College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. IIM Bangalore"
                  value={pgCollege}
                  onChange={(e) => setPgCollege(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  PG Course / Branch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MBA Finance"
                  value={pgCourse}
                  onChange={(e) => setPgCourse(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>
            </>
          )}

          {/* Working Professional */}
          {qualification === "Working Professional" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Current Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google, Infosys"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Job Title / Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
                  required
                />
              </div>
            </>
          )}

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2022"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2a2a40] border border-gray-600 text-white text-sm sm:text-base"
              min="2012"
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

export default AlumniFormPage;
