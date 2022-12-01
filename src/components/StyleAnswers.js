import { Box, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

function StyleAnswers(props) {

    const url = props.urlHost

    const [status, setStatus] = useState('waiting')
    const [query, setQuery] = useState({})

    const getQuery = async () => {

        try {
            const connection = await fetch(url + 'queries/' + props.queryId)
            const result = await connection.json()

            setQuery(result)
            console.log('query:')
            console.log(query)
            setStatus('')
        } catch (error) {
            setStatus('connection error')
        }


    }

    useEffect(() => {
        getQuery()
        // eslint-disable-next-line
    },[status])

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
        title: "",
    };

    if (status.length === 0){
        return (
            <Box>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Paper sx={{margin: 1, padding: 2, textAlign: "center", width: "fit-content", }}>
                        <Typography variant="h3">{query.title}</Typography>
                        <Typography>{query.description}</Typography>
                    </Paper>
                </Box>
                {styledArray.map(styled => {

                    const show = [
                        ["plaa", "plaa"]
                    ]
    
                    for (let i = 0; i < styled.options.length; i++) {
                        show.push([styled.options[i].option, styled.answerAmount[i].count])
                    }
    
                    return (
                        <Grid container spacing={2} sx={{width: "100%"}}>
    
                            <Grid item sx={{width: "50%", height: "500px"}}>
                            <Box sx={{padding: 3}}>
                            <TableContainer>
                                <Typography variant="h4">{styled.question}</Typography>
                                <TableHead>
                                    {styled.options.map(option =>{
                                        return (<TableCell>{option.option}</TableCell>)
                                    })}
                                </TableHead>
                                
                                <TableBody>
                                    <TableRow>
                                        {styled.answerAmount.map(answer => {
                                            return(<TableCell>{answer.count}</TableCell>)
                                        })}
                                    </TableRow>
                                </TableBody>
                            </TableContainer>
                            </Box>
                            </Grid>
    
                            <Grid item sx={{width: "50%"}}>
                                <Box>
                                    <Chart
                                        chartType="PieChart"
                                        data={show}
                                        options={options}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </Box>
                            </Grid>
    
                            
                        </Grid>
                    )
            })}
            </Box>
        )
    } else {
        return (
            <Typography>{status}</Typography>
        )
    }
    
}

export default StyleAnswers