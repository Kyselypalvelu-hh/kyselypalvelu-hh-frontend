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
import { Outlet } from "react-router-dom";
import AnswerForm from "./AnswerForm";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [queries, setQueries] = useState([]);
  const [onError, setOnError] = useState("Loading...");
  const [shownQuestions, setShownQuestions] = useState([]);

  const local = 'http://localhost:8080/'
  const server = "https://swd022-kyselypalvelu-back.herokuapp.com/"
  const url = local

  //FETCH ALL QUESTIONS
  //CHANGE URL WHEN DEPLOYED TO HEROKU
  useEffect(() => {
    fetch(url + "uestions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        console.log(data);
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

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          bgcolor: "teal",
          minWidth: 800,
          maxWidth: 800,
          display: "flex",
          justifyContent: "center",
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
                onClick={(e) => {
                  let shownQ = [];
                  //LOOP THROUGH ALL QUESTIONS OF PRESSED BUTTON (QUERY)
                  //AND ADD THEM TO TEMPORARY ARRAY(shownQ)
                  for (let openQuestion of query.textQuestions) {
                    shownQ.push(openQuestion);
                  }
                  for (let multipleQuestion of query.choiceQuestions) {
                    shownQ.push(multipleQuestion);
                  }
                  //SETS STATE SO WE CAN GET THIS DATA OUTSIDE OF THIS BUTTON
                  //DATA NEEDED IN THE LIST BELOW
                  console.log(shownQ)
                  setShownQuestions(shownQ);
                  console.log(shownQuestions)
                }}
              >
                {query.title}
              </Button>
            );
          })}

          {/* IF shownQuestion STATE IS NOT EMPTY, 
              WE RENDER A LIST WITH ITS QUESTIONS*/}
          {shownQuestions.length !== 0 && (
            <AnswerForm shownQuestions={shownQuestions} />
          )}
        </CardContent>
      </Card>
      <Outlet></Outlet>
    </Box>
  );
};
