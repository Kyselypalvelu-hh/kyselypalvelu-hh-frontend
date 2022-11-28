import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Chart } from "react-google-charts";

function StyleAnswers(props) {

    const array = []
    props.answers.map(answer => {
        if (answer.choiceAnswer.length > 0) {
            array.push({
                answers: answer.choiceAnswer,
                question: answer.question
            })
        }
        return
    })
    //let array = props.answers.sort(function (a, b) { return b.choiceAnswer.length - a.choiceAnswer.length })

    const modArray = (list) => {
        /*
        {
            "answers": [
                {
                    "answerId": 1,
                    "question": {},
                    "options": [{
                    
                    }]
                }
            ],
            "question": {
                "questionId": 1,
                "question": "Aloititko opiskelun",
                "query": {},
                "choiceOptions": [],
                "answers": [],
                "checkbox": false,
                "questionIf": "Aloititko opiskelun",
                "questionType": "radio"
            }
        }
        */
        const moddedArray = [] //to be returned

        //Map all questions
        list.map(question => {
            let abc = [] //abc -> answerAmount
            //Map all options of question
            for (let i = 0; i < question.question.choiceOptions.length; i++){
                let count = 0
                let id = question.question.choiceOptions[i].optionId
                console.log('Mapping options: ' + count + ' ' + id)
                //map all answers
                question.answers.map(answer => {
                    //map all options given in an answer
                    answer.options.map(option => {
                        if (option.optionId === id) count++
                    })
                })

                abc.push({
                    id: id,
                    count: count
                })
            }
            
            //adds one questions summary into array
            moddedArray.push({
                question: question.question.questionIf,
                options: question.question.choiceOptions,
                answerAmount: abc
            })
        })


        return moddedArray
        
    }

    const styledArray = modArray(array)

    //TESTING PIE CHART

    const options = {
        title: "My Daily Activities",
    };

    return (
        <Box>
            
            {styledArray.map(styled => {
                /*return (
                <TableContainer>
                    <Typography>{e.question}</Typography>
                        <TableHead>
                            {e.options.map(option =>{
                                return (<TableCell>{option.option}</TableCell>)
                            })}
                        </TableHead>
                        
                    <TableBody>
                        <TableRow>
                            {e.answerAmount.map(answer => {
                                return(<TableCell>{answer.count}</TableCell>)
                            })}
                        </TableRow>
                    </TableBody>
                </TableContainer>
            )
            */
                const show = [
                    ["plaa", "plaa"]
                ]

                for (let i = 0; i < styled.options.length; i++) {
                    show.push([styled.options[i].option, styled.answerAmount[i].count])
                }

                return (
                    <Chart
                chartType="PieChart"
                data={show}
                options={options}
                width={"100%"}
                height={"400px"}
            />
                )
        })}
        </Box>
    )
}

export default StyleAnswers