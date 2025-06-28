/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const WaitlistContext = createContext();

export const useWaitlist = () => useContext(WaitlistContext);

export const WaitlistProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const updateFormData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <WaitlistContext.Provider value={{ formData, updateFormData }}>
      {children}
    </WaitlistContext.Provider>
  );
};
