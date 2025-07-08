import { useEffect } from "react";
import { useLogo } from "./useLogo";

export const useFavicon = () => {
  const { logoUrl, isLoading } = useLogo();

  useEffect(() => {
    if (logoUrl && !isLoading) {
      // Update favicon
      const favicon = document.querySelector('link[rel="icon"]') || 
                     document.querySelector('link[rel="shortcut icon"]');
      
      if (favicon) {
        favicon.href = logoUrl;
      } else {
        // Create favicon link if it doesn't exist
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = logoUrl;
        document.head.appendChild(link);
      }

      // Also update any apple-touch-icon if present
      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (appleTouchIcon) {
        appleTouchIcon.href = logoUrl;
      }
    }
  }, [logoUrl, isLoading]);

  return { logoUrl, isLoading };
}; 