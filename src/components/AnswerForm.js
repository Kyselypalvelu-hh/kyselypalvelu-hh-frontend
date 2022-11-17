import React, { useState } from "react";

export default function AnswerForm(props) {
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAsnwerTwo] = useState("");
  /*  const [answerData, setAnswerData] = useState({
    vastausYksi: "",
    vastausKaksi: "",
  }); */
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.shownQuestions);
    try {
      let res = await fetch("https://swd022-kyselypalvelu-back.herokuapp.com/answers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textAnswer: [
            {
              answer: answerOne,
              /* question: props.shownQuestions[0].title, */
              question: { questionId: props.shownQuestions[0].questionId },
            },
            {
              answer: answerTwo,
              /* question: props.shownQuestions[1].title, */
              question: { questionId: props.shownQuestions[1].questionId },
            },
          ],
          choiceAnswer: [],
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setAnswerOne("");
        setAsnwerTwo("");
        setMessage("Answers posted successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    //BOOTSTRAP FORM
    /*   <form onSubmit={handleSubmit}>
      {props.shownQuestions.map((question) => {
        return (
          <div className="form-group" key={question.title}>
            <label>{question.title}</label>
            <textarea
              style={{ height: "100px" }}
              type="text"
              className="form-control"
              onChange={(e) => {
                setAnswerData({ vastausYksi: e.target.value });
                console.log(answerData);
              }}
            />
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form> */
    <form onSubmit={handleSubmit}>
      <div className="form-group" key={props.shownQuestions.title}>
        <label>{props.shownQuestions[0].title}</label>
        <textarea
          style={{ height: "100px" }}
          type="text"
          value={answerOne}
          className="form-control"
          onChange={(e) => {
            setAnswerOne(e.target.value);
            console.log(answerOne);
          }}
        />
        <label>{props.shownQuestions[1].title}</label>
        <textarea
          style={{ height: "100px" }}
          type="text"
          value={answerTwo}
          className="form-control"
          onChange={(e) => {
            setAsnwerTwo(e.target.value);
            console.log(answerTwo);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div>{message ? <p>{message}</p> : null}</div>
    </form>
  );
}
