import React, { Component, ChangeEvent, FormEvent, JSX } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AnswerForm.css";
import successGif from "../assets/blk-mage-dance.gif";

interface AnswerFormState {
  response: string;
  errorMessage: string;
  submitted: boolean;
}

class AnswerForm extends Component<{}, AnswerFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      response: "",
      errorMessage: "",
      submitted: false,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      response: e.target.value,
    });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!this.state.response) {
      this.setState({
        errorMessage: "Answer content cannot be empty",
      });
      return;
    }

    const answer = {
      response: this.state.response,
      createdAt: new Date(),
    };
    // Sends POST request to backend API to submit the answer
    axios
      .post("http://localhost:8080/api/answers/submitAnswer", answer)
      .then((response) => {
        console.log("Answeria submitted successfully:", response.data);
        this.setState({
          response: "",
          errorMessage: "",
          submitted: true,
        });
        setTimeout(() => {
          this.setState({ submitted: false });
        }, 4000);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  render() {
    return (
      <div className="container">
        {" "}
        {/* Add the 'container' class here */}
        <h2>Submit an Answer</h2>
        {this.state.submitted && (
          <img
            src={successGif} // path to the GIF
            alt="Success GIF"
            className="success-gif"
          />
        )}
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {" "}
            {/* Add the 'form-group' class here */}
            <label>Answer:</label>
            <textarea
              className="form-control"
              rows={4}
              cols={50}
              value={this.state.response}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Answer
          </button>
        </form>
      </div>
    );
  }
}

export default AnswerForm;
