
export default function OpenTextQuestion(props){
    return (
        <div>
        <label>{props.questions.questionIf}</label>
            <textarea
            style={{ height: "100px" }}
            type="text"
            className="form-control"
          />
          </div>
      );
    }