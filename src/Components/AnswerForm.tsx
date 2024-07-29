import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import "./AnswerForm.css";
import useUser from "./UseUser";
import successGif from "../assets/blk-mage-dance.gif";

interface AnswerFormState {
  response: string;
  errorMessage: string;
  submitted: boolean;
}

const AnswerForm: React.FC = () => {
  const { currentUserSID } = useUser();

  const [state, setState] = useState<AnswerFormState>({
    response: "",
    errorMessage: "",
    submitted: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, response: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!state.response) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Answer content cannot be empty",
      }));
      return;
    }

    const answer = {
      response: state.response,
      createdAt: new Date().toISOString(),
      SID: currentUserSID,
    };

    axios
      .post("http://localhost:8080/api/answers/submitAnswer", answer, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Answer submitted successfully:", response.data);
        setState((prevState) => ({
          ...prevState,
          response: "",
          errorMessage: "",
          submitted: true,
        }));
        setTimeout(() => {
          setState((prevState) => ({ ...prevState, submitted: false }));
        }, 4000);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Error submitting answer: " + error.message,
        }));
      });
  };

  return (
    <div className="container">
      <h2>Submit an Answer</h2>
      {state.submitted && (
        <img src={successGif} alt="Success GIF" className="success-gif" />
      )}
      {state.errorMessage && (
        <div className="alert alert-danger">{state.errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Answer:</label>
          <textarea
            className="form-control"
            rows={4}
            cols={50}
            value={state.response}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
