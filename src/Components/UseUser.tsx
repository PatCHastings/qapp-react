import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const useUser = (): { currentUserSID: string | null } => {
  const { currentUserSID, setCurrentUserSID } = useContext(UserContext);

  useEffect(() => {
    const fetchCurrentUserSID = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/answers/getCurrentUserSID",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data: { SID: string } = await response.json();
          setCurrentUserSID(data.SID);
        } else {
          setCurrentUserSID(null);
        }
      } catch (error) {
        console.error("Error fetching current user SID:", error);
        setCurrentUserSID(null);
      }
    };

    fetchCurrentUserSID();
  }, []);

  return { currentUserSID };
};

export default useUser;
