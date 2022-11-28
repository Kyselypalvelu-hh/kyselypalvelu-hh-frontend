import { QuestionAnswer } from "@mui/icons-material";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function ViewAnswers() {
    let { id } = useParams()
    const [status, setStatus] = useState('Fetching')
    const [answers, setAnswers] = useState([])

    const local = 'http://localhost:8080/'
    const server = "https://swd022-kyselypalvelu-back.herokuapp.com/"
    const url = local

    const fetchAnswers = async () => {
        try {
            const connection = await fetch(server + 'queryanswers/' + id)
            const json = await connection.json()
            setAnswers(json)

            console.log(answers)

            setStatus('')

        } catch (error) {
            setStatus('Error')
        }
    }

    //do fetch inside{}
    useEffect(() => { fetchAnswers() }, [])

    if (status.length === 0) {
        let key = 0
        return (
            <Box>
                {answers.map(question => {
                    key++
                    return (
                        <Box>
                            <Typography key={key}>QUESTION: {question.textAnswer[0].question.title}</Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>answer id</TableCell>
                                            <TableCell>answer</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {question.textAnswer.map(answer => {
                                            return (
                                                <TableRow key={answer.answerId}>
                                                    <TableCell>{answer.answerId}</TableCell>
                                                    <TableCell>{answer.answer}</TableCell>
                                                </TableRow>
                                        )})}
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