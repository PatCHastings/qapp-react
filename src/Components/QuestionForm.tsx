import React, { Component, ChangeEvent, FormEvent, JSX } from "react";
import axios from "axios";

interface QuestionFormState {
  response: string;
  errorMessage: string;
  submitted: boolean;
}

class QuestionForm extends Component<{}, QuestionFormState> {}
