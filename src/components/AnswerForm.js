import React from "react";
import { List, ListItem } from "@mui/material";

export default function AnswerForm(props) {
  return (
    //BOOTSTRAP FORM
    <form>
      {props.shownQuestions.map((question) => {
        return (
          <div className="form-group" key={question.title}>
            <label>{question.title}</label>
            <textarea
              style={{ height: "100px" }}
              type="text"
              className="form-control"
            />
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
