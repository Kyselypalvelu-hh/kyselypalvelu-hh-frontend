import {
  Card,
  Box,
  CardContent,
  List,
  ListItem,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [queries, setQueries] = useState([]);
  const [onError, setOnError] = useState("Loading...");
  const [shownQuestions, setShownQuestions] = useState([]);
  const [choiceQuestions, setChoiceQuestions] = useState([]);
  const [queryId, setQueryId] = useState(0)
  const [viewQuestions, setViewQuestions] = useState(false)

  const local = "http://localhost:8080/";
  const server = "https://swd022-kyselypalvelu-back.herokuapp.com/";
  const url = server;

  //FETCH ALL QUESTIONS
  //CHANGE URL WHEN DEPLOYED TO HEROKU

  useEffect(() => {
    setShownQuestions([])
    fetch(url + "questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setOnError("");
      })
      .catch((err) => setOnError("Failed to fetch data"));
  }, []);

  //FETCH ALL QUERIES
  //CHANGE URL WHEN DEPLOYED
  useEffect(() => {
    fetch(url + "queries")
      .then((response) => response.json())
      .then((data) => {
        setQueries(data);
        setOnError("");
      })
      .catch((err) => setOnError("Failed to fetch data"));
  }, []);

  //RETURNS DIV OF ERROR TEXT IF QUERIES OR QUESTIONS ARE EMPTY
  if (queries === 0) {
    return <div>{onError}</div>;
  }
  if (questions === 0) {
    return <div>{onError}</div>;
  }

  const changeQueryId = (e) => {
    setViewQuestions(false)
    setQueryId(e)
    setViewQuestions(true)
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        elevation = {4}
        sx={{
          bgcolor: "white",
          minWidth: 800,
          maxWidth: 800,
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3

        }}
      >
        <CardContent sx={{ width: "500px" }}>
          <Typography variant="h6">
            Show all questions of selected query
          </Typography>
          {queries.map((query) => {
            return (
              <Button
                key={query.id}
                sx={{ margin: "4px" }}
                variant="contained"
                onClick={(e) => changeQueryId(query.id)}
              >
                {query.title}
              </Button>
            );
          })}

          {/* IF shownQuestion STATE IS NOT EMPTY, 
              WE RENDER A LIST WITH ITS QUESTIONS*/}
          {viewQuestions && (
            <AnswerForm
              queryId={queryId}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
