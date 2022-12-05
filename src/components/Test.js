import React, { useEffect, useState } from 'react'

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

    const submitForm = () => {
        
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

    let textIndex = -1

    if (status.length === 0) {
        return (
            <div>
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
                    
                <button onClick={() => submitForm()}>submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <p>{status}</p>
        )
    }

}

export default Test