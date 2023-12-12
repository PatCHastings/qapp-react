import { useState, useEffect } from "react";

interface User {
  SID: string;
}

// Define a custom hook to get the current user's SID
const useUser = (): { currentUserSID: string | null } => {
  const [currentUserSID, setCurrentUserSID] = useState<string | null>(null);

  useEffect(() => {
    // You should fetch the currentUserSID from your authentication system here
    // For example, using a session or a JWT token
    // Set it using setCurrentUserSID

    // For demonstration purposes, let's assume you have a function that fetches the SID
    const fetchCurrentUserSID = async () => {
      try {
        const response = await fetch("/api/getCurrentUserSID"); // Replace with your actual API endpoint
        if (response.ok) {
          const data: User = await response.json();
          setCurrentUserSID(data.SID); // Assuming your API returns the SID
        } else {
          setCurrentUserSID(null); // Set to null if there's no authenticated user
        }
      } catch (error) {
        console.error("Error fetching current user SID:", error);
        setCurrentUserSID(null); // Handle errors gracefully
      }
    };

    fetchCurrentUserSID(); // Fetch the current user's SID when the component mounts
  }, []);

  return { currentUserSID };
};

export default useUser;
