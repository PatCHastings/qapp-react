import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./Components/ListGroup";
import AnswerForm from "./Components/AnswerForm";
import "bootstrap/dist/css/bootstrap.css";
import WelcomePage from "./Components/WelcomePage";
import RegistrationPage from "./Components/RegistrationPage";

import { UserContext } from "./Components/UserContext";

function App() {
  const [currentUserSID, setCurrentUserSID] = useState<string | null>(null);
  return (
    <div>
      <UserContext.Provider value={{ currentUserSID, setCurrentUserSID }}>
        <Router>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/answerForm/:SID" element={<AnswerForm />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
