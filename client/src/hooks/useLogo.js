import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const useLogo = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Create reference to logo.png in Firebase Storage
        const logoRef = ref(storage, 'resumes/Logo.png');
        
        // Get download URL
        const url = await getDownloadURL(logoRef);
        setLogoUrl(url);
      } catch (err) {
        console.error("Error fetching logo:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return { logoUrl, isLoading, error };
}; 