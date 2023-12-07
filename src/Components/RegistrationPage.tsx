import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [sid, setSid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to save user registration data
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sid }),
      });

      if (response.ok) {
        // Registration successful, navigate to WelcomePage
        navigate("/welcome");
      } else {
        // Registration failed, display an error message
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>SID:</label>
          <input
            type="text"
            className="form-control"
            value={sid}
            onChange={(e) => setSid(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}

export default RegistrationPage;
