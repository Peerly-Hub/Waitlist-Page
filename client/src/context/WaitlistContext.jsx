/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";

const WaitlistContext = createContext();

export const useWaitlist = () => useContext(WaitlistContext);

export const WaitlistProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step 1 data
    name: "",
    email: "",
    contact: "",
    
    // Step 2 data
    role: "",
    
    // Step 3 data
    resume: null,
    linkedIn: "",
    portfolio: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  const uploadResumeToStorage = async (file, userEmail) => {
    if (!file) return null;
    
    try {
      // Create a unique file path using timestamp and email
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `resumes/${userEmail}_${timestamp}.${fileExtension}`;
      
      // Create storage reference
      const storageRef = ref(storage, fileName);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        fileName: file.name,
        storagePath: fileName
      };
    } catch (error) {
      console.error("Error uploading resume:", error);
      throw new Error("Failed to upload resume. Please try again.");
    }
  };

  const submitToFirebase = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let resumeData = null;
      
      // Upload resume to Firebase Storage if it exists
      if (formData.resume) {
        resumeData = await uploadResumeToStorage(formData.resume, formData.email);
      }
      
      // Prepare data for Firestore
      const dataToSave = {
        name: formData.name,
        email: formData.email.toLowerCase().trim(),
        contact: formData.contact || "",
        role: formData.role,
        linkedIn: formData.linkedIn || "",
        portfolio: formData.portfolio || "",
        resume: resumeData ? {
          fileName: resumeData.fileName,
          downloadURL: resumeData.url,
          storagePath: resumeData.storagePath
        } : null,
        submittedAt: new Date(),
        status: "pending"
      };

      // Add document to waitlist collection
      const docRef = await addDoc(collection(db, "waitlist"), dataToSave);
      console.log("Document written with ID: ", docRef.id);
      
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error("Error adding document: ", err);
      setError(err.message || "Failed to submit your application. Please try again.");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      role: "",
      resume: null,
      linkedIn: "",
      portfolio: "",
    });
    setError(null);
  };

  return (
    <WaitlistContext.Provider
      value={{
        formData,
        updateFormData,
        submitToFirebase,
        clearForm,
        isLoading,
        error,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};
