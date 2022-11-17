import React, { useState } from "react";

export default function AnswerForm(props) {
  const [vastausYksi, setVastausYksi] = useState("");
  const [vastausKaksi, setVastausKaksi] = useState("");
  /*  const [answerData, setAnswerData] = useState({
    vastausYksi: "",
    vastausKaksi: "",
  }); */
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          textAnswers: [
            { answer: vastausYksi, question: props.shownQuestions[0] },
            { answer: vastausKaksi, question: props.shownQuestions[1] },
          ],
          choiceAnswer: [],
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setVastausYksi("");
        setVastausKaksi("");
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
          className="form-control"
          onChange={(e) => {
            setVastausYksi(e.target.value);
            console.log(vastausYksi);
          }}
        />
        <label>{props.shownQuestions[1].title}</label>
        <textarea
          style={{ height: "100px" }}
          type="text"
          className="form-control"
          onChange={(e) => {
            setVastausKaksi(e.target.value);
            console.log(vastausKaksi);
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
