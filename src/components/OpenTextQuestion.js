
export default function OpenTextQuestion(props){
  console.log(props.OpenTextQuestion)
    return (
        <div>
        <label>{props.questions.questionIf}</label>
            <textarea
            style={{ height: "100px" }}
            type="text"
            className="form-control"
            value={props.openTextAnswers}
            onChange={(e) => {
              props.setAnswer({
                ...props.openTextAnswers,
                [props.questionId] : e.target.value
              })
            }
            }

          />
          </div>
      );
    }