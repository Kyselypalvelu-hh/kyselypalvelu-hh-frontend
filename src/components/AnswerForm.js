import React, { useState } from "react";
import RadioQuestion from "./RadioQuestion";
import OpenTextQuestion from "./OpenTextQuestion";
export default function AnswerForm(props) {
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAsnwerTwo] = useState("");
  const [answers, setAnswers] = useState("");
  /*  const [answerData, setAnswerData] = useState({
    vastausYksi: "",
    vastausKaksi: "",
  }); */
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.shownQuestions);
    console.log(props.choiceQuestions);
    try {
      let res = await fetch(
        "https://swd022-kyselypalvelu-back.herokuapp.com/answers",
        {
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
        }
      );
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
    <form onSubmit={handleSubmit}>
      <div className="form-group" key={props.shownQuestions.title}>
{/*         <div className="openTextQuestion">
          {props.shownQuestions.map((openQuestion) => (
            <div key={openQuestion.questionId}>
              <label>{openQuestion.title}</label>
              <textarea
                style={{ height: "100px" }}
                type="text"
                value={answerTwo}
                className="form-control"
                onChange={(e) => {
                  setAsnwerTwo(e.target.value);d
                  console.log(answerTwo);
                }}
              />
            </div>
          ))}
</div> */}
          <div className="openTextQuestions">
            {props.shownQuestions.map((openTextQuestion) => (
              <OpenTextQuestion
                key={openTextQuestion.questionId}
                questions={openTextQuestion}
              />
            ))}
          </div>
        
        <div className="choiceQuestions">
          {props.choiceQuestions.map((choiceQuestion) => (
            <RadioQuestion
              key={choiceQuestion.questionId}
              question={choiceQuestion}
            />
          ))}
        </div>
        {/*<label>{props.shownQuestions[2].question}</label>
         <textarea
          style={{ height: "100px" }}
          type="text"
          value={answerOne}
          className="form-control"
          onChange={(e) => {
            setAnswerOne(e.target.value);
            console.log(answerOne);
          }}
        />  */}

        {/*       {props.ChoiceQuestions.map((choiceQuestion) => 
    <div key = {choiceQuestion.questionId}> 
    <p>{choiceQuestion.id}</p>
    </div>
    )} */}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={console.log(props.shownQuestions)}
      >
        Submit
      </button>
      <div>{message ? <p>{message}</p> : null}</div>
    </form>
  );
}
