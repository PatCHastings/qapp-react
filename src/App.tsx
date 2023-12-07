import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./Components/ListGroup";
import AnswerForm from "./Components/AnswerForm";
import "bootstrap/dist/css/bootstrap.css";
import WelcomePage from "./Components/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes using <Route> */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/answer" element={<AnswerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
