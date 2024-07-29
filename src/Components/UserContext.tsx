import React from "react";

interface UserContextProps {
  currentUserSID: string | null;
  setCurrentUserSID: React.Dispatch<React.SetStateAction<string | null>>;
}
const defaultContext: UserContextProps = {
  currentUserSID: null,
  setCurrentUserSID: () => {}, // empty function
};

export const UserContext =
  React.createContext<UserContextProps>(defaultContext);
