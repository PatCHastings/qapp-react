import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const [SID, setSID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Send a GET request to the server to authenticate the SID
      const response = await fetch(
        `http://localhost:8080/api/users/authenticate?SID=${SID}`
      );

      if (response.ok) {
        // SID is authenticated, navigate to AnswerForm
        navigate("/answer");
      } else {
        // SID is not authenticated, display an error message
        setErrorMessage("SID is not valid. Please try again.");
      }
    } catch (error) {
      console.error("Error authenticating SID:", error);
      setErrorMessage(
        "An error occurred and the authorities have been notified."
      );
    }
  };

  return (
    <div className="container">
      <h2>Welcome to QApp</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Your SID:</label>
          <input
            type="text"
            className="form-control"
            value={SID}
            onChange={(e) => setSID(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit SID
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}

export default WelcomePage;
