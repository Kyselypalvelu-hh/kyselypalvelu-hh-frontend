import React, { useState,useEffect } from "react";
import axios from 'axios'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Checkbox, Snackbar, Button } from '@mui/material';

export default function AnswerForm(props) {

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleClose = () => {
    setOpenSnackbar(false)
  }

  const local = "http://localhost:8080/";
  const server = "https://swd022-kyselypalvelu-back.herokuapp.com/";
  const host = server;
  
  //FROM TEST:JS--------------------
  const [query, setQuery] = useState({}) //fetched from db
  const [status, setStatus] = useState('waiting') //status of fetch
  const [text, setText] = useState([]) //array of text annswers
  const [choice, setChoice] = useState([]) //array of choiceQuestions with answer array included

  useEffect(() => {
    fetchUrl()
    // eslint-disable-next-line
  }, [props.queryId])
    
  //format query options and questions into useStates text+choice
  const createAnswers = (e) => {
    const txt = []
    const choices = []
    e.textQuestions.forEach(question => {
      txt.push({
        id: question.questionId,
        answer: ''
      })
    })
    setText(txt)

    e.choiceQuestions.forEach(question => {
      choices.push({
        id: question.questionId,
        options: question.choiceOptions,
        checkbox: question.checkbox,
        answers: []
      })
    })
    setChoice(choices)
  }
    
  //fetch query from db
  const fetchUrl = async () => {
    const connection = await fetch(host + 'queries/' + props.queryId)
    const json = await connection.json()
    setQuery(json)
    createAnswers(json)
    setStatus('')

  }

  //post already formatted body(json) to DB
  const postForm = async (body) => {
    console.log("posting")
    try {
      const connection = await axios.post(host + "answers", body)
      if (connection.status === 200) {
        setOpenSnackbar(true)
      }
    } catch (error) {
        console.log(error)
    }
  }

  //format all answers into correct json format for DB
  const submitForm = () => {
    const textAnswer = []
    text.forEach(a => {
      textAnswer.push({
        answer: a.answer,
        question: { questionId: a.id }
      })
    })
    const choiceOptions = []//{question, optionId}

    choice.forEach(choi => {
      const qList = []
      choi.answers.forEach(ans => {
        qList.push({
          optionId: ans,
          question: { questionId: choi.id }
        })
      })
      choiceOptions.push({
        question: { questionId: choi.id },
        options: qList
      })
    })
        
        
    const body = {
      textAnswer: textAnswer,
      choiceAnswer: choiceOptions
    }

    //console.log(body)
    postForm(body)
  }

  //Update text field with correct id
  const updatetext = index => e => {

    let array = [...text]
    array[index] = {
      id: array[index].id,
      answer: e.target.value
    }
    setText(array)

  }


  //Change radio to active
  const activeRadio = (e, questionId) => {
    choice.forEach(cho => {
      if (cho.id === questionId) {
        if (cho.answers.includes(e)) {
          console.log("in array")
          let index = cho.answers.indexOf(e)
          cho.answers.splice(index, 1)
        } else if (cho.checkbox) {
          cho.answers.push(e)
        } else {
          cho.answers = [e]
        }
      }
    })
  }

  let textIndex = -1
  //check the question type for rendering choicequestions
  /* function choiceQuestionRender(question) {
    const type = question.type
    if(type == "radio"){
      return <RadioQuestion></RadioQuestion>
    }
    else{
      return <MultipleQuestion></MultipleQuestion>
    }
  } */
  
  if (status.length === 0) {
    return (
      <div style={{ padding: 5 }}>
        <form>
          <p>{query.title}</p>
          {query.textQuestions.map(question => {
            textIndex++
            return (
              <div key={question.questionId}>
                <label>{question.questionIf}</label>
                <textarea
                  style={{ height: "100px" }}
                  type="text"
                  className="form-control"
                  value={text[textIndex].answer} onChange={updatetext(textIndex)}
                />
              </div>
            )
          })}

          {query.choiceQuestions.map(question => {
            //questions
            return (
              <Box key={question.questionId}>
                {question.checkbox
                  ? <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group">
                    <label>{question.questionIf}</label>
                    {question.choiceOptions.map(option => {
                      //options
                      return (
                        <FormControlLabel
                          key={option.optionId}
                          value={option.optionId}
                          control={<Checkbox></Checkbox>}
                          label={option.option}
                          onClick={() => activeRadio(option.optionId, question.questionId)}
                        />
                      )
                    })}
                  </RadioGroup>
                            
                  : <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group">
                    <label>{question.questionIf}</label>
                    {question.choiceOptions.map(option => {
                      //options
                      return (
                        <FormControlLabel
                          key={option.optionId}
                          value={option.optionId}
                          control={<Radio />}
                          label={option.option}
                          onClick={() => activeRadio(option.optionId, question.questionId)}
                        />
                      )
                    })}
                  </RadioGroup>
                        
                }
              </Box>
                        
            )
          })}
                
            
        </form>
        <Button onClick={() => submitForm()}>submit</Button>
        <Snackbar open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Answer saved!"
        >
        </Snackbar>
      </div>
    )
  } else {
    return (
      <p>{ status }</p>
    );
  }
}
