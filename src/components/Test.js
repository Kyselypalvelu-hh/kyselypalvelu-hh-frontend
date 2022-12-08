import React, { useEffect, useState } from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from 'axios';

function Test() {
    const [query, setQuery] = useState({})
    const [status, setStatus] = useState('waiting')
    const [answers, setAnswers] = useState({})
    const [text, setText] = useState([])
    const [choice, setChoice] = useState([])

    useEffect(() => {
        fetchUrl()
    }, [])
    
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
    
    const fetchUrl = async () => {
        const connection = await fetch('http://localhost:8080/queries/1')
        const json = await connection.json()
        setQuery(json)
        createAnswers(json)
        setStatus('')
    }

    const postForm = async (body) => {
        try {
            const connection = await axios.post("http://localhost:8080/answers", body)
            const ok = await connection.json()
            console.log(ok)
        } catch (error) {
            
        }
    }

    const getChoicesJson = () => {
        const list = []
        return list
    }

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

        console.log(body)
        postForm(body)
    }

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

    const activeRadio = (e,questionId) => {
        console.log(e)
        console.log(questionId)
        choice.forEach(cho => {
            if (cho.id === questionId) {
                if (e in cho.answers) {
                    cho.answer.remove(e)
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
                            <label>{question.questionIf}</label><input value={text[textIndex].answer} onChange={updatetext(textIndex)}></input>
                        </div>
                    )
                    })}

                    {query.choiceQuestions.map(question => {
                        return (
                            <RadioGroup>
                                <label>{question.questionIf}</label>
                                {question.choiceOptions.map(option => {
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