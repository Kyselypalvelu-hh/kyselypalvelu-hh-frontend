import React, { useEffect, useState } from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from 'axios';
import { Box, Checkbox } from '@mui/material';

function Test() {
    const [query, setQuery] = useState({}) //fetched from db
    const [status, setStatus] = useState('waiting') //status of fetch
    const [answers, setAnswers] = useState({})
    const [text, setText] = useState([]) //array of text annswers
    const [choice, setChoice] = useState([]) //array of choiceQuestions with answer array included

    useEffect(() => {
        fetchUrl()
    }, [])
    
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
        const connection = await fetch('http://localhost:8080/queries/3')
        const json = await connection.json()
        setQuery(json)
        createAnswers(json)
        setStatus('')
    }

    //post already formatted body(json) to DB
    const postForm = async (body) => {
        try {
            const connection = await axios.post("http://localhost:8080/answers", body)
            const ok = await connection.json()
            console.log(ok)
        } catch (error) {
            
        }
    }

    //unused
    const getChoicesJson = () => {
        const list = []
        return list
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
                    question: {questionId: choi.id}
                })
            })
            choiceOptions.push({
                question: {questionId: choi.id},
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
        console.log(index)
        console.log(e.target.value)
        let array = [...text]
        array[index] = {
            id: array[index].id,
            answer: e.target.value
        }
        setText(array)

    }

    console.log(text)

    //Change radio to active
    const activeRadio = (e,questionId) => {
        console.log(e)
        choice.forEach(cho => {
            if (cho.id === questionId) {
                if (cho.answers.includes(e)) {
                    console.log("in array")
                    let index = cho.answers.indexOf(e)
                    cho.answers.splice(index, 1)
                } else if(cho.checkbox){
                    cho.answers.push(e)
                } else {
                    cho.answers = [e]
                }
            } 
        })

        console.log(choice)
    }

    let textIndex = -1

    if (status.length === 0) {
        return (
            <div style={{padding: 5}}>
            <form>
                <p>{query.title}</p>
                    {query.textQuestions.map(question => {
                        textIndex++
                        return (
                            <div>
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
                            <Box>
                            {question.checkbox
                                ?   <RadioGroup
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
                                        )})}
                                    </RadioGroup>
                                
                                :   <RadioGroup
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
                                        )})}
                                    </RadioGroup>
                            
                            }
                                </Box>
                            
                    )
                    })}
                    
                
                </form>
                <button onClick={() => submitForm()}>submit</button>
            </div>
        )
    } else {
        return (
            <p>{status}</p>
        )
    }

}

export default Test