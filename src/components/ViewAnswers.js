import { QuestionAnswer } from "@mui/icons-material";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import StyleAnswers from "./StyleAnswers";

function ViewAnswers() {
    let { id } = useParams()
    const [status, setStatus] = useState('Fetching')
    const [answers, setAnswers] = useState([])

    const local = 'http://localhost:8080/'
    const server = "https://swd022-kyselypalvelu-back.herokuapp.com/"
    const url = local

    const fetchAnswers = async () => {
        try {
            const connection = await fetch(url + 'queryanswers/' + id)
            const json = await connection.json()
            setAnswers(json)
            setStatus('')

        } catch (error) {
            setStatus('Error')
        }
    }

    //do fetch inside{}
    useEffect(() => { fetchAnswers() }, [])

    if (status.length === 0) {
        return (
            <Box>
                <StyleAnswers answers={answers} queryId={id} urlHost={url}></StyleAnswers>
                {answers.map(question => {
                    return (
                        <Box key={question.questionId} sx={{marginTop: 10}}>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{width: "25%"}}>answer id</TableCell>
                                            
                                            {question.question.questionType !== 'text' //Map headers for multiple chice questions
                                                ? question.question.choiceOptions.map(option => {
                                                    //Make all answers have similar look to them
                                                    let size = (75 / question.question.choiceOptions.length) + '%'
                                                    let width = {width: size}
                                                    return (
                                                        <TableCell key={option.optionId} sx={width}>{option.option}</TableCell>
                                                    )
                                                })
                                                : <TableCell>answer</TableCell>
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                        //show text question answers
                                        question.question.questionType === 'text' // ?-> true, : ->else
                                            ? question.textAnswer.map(answer => {
                                                return (
                                                    <TableRow key={answer.answerId}>
                                                        <TableCell>{answer.answerId}</TableCell>
                                                        <TableCell>{answer.answer}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                                
                                                : question.choiceAnswer.map(answer => {
                                                //show answers for multiple choice questions (corrext option is shown as X)
                                                //TODO currently only works for radioquestions, add mapping for answer.options[]
                                                return (
                                                    <TableRow key={answer.answerId}>
                                                        <TableCell>{answer.answerId}</TableCell>
                                                        {answer.question.choiceOptions.map(option => {
                                                            if(answer.options[0].optionId === option.optionId){
                                                                return(<TableCell key={option.optionId}>X</TableCell>)
                                                            } else {
                                                                return(<TableCell key={option.optionId}></TableCell>)
                                                            }
                                                            
                                                        })}
                                                    </TableRow>
                                                )
                                            })

                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                )})}
            <Outlet></Outlet>
            </Box>
        )
    } else {
        return (
            <Box>
                <Typography>{status}</Typography>
                <Outlet></Outlet>
            </Box>
        )
    }

}

export default ViewAnswers;