import { Card, Box, CardContent, List, ListItem, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [queries, setQueries] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  // Fetch all questions
  //CHANGE URL WHEN DEPLOYED TO HEROKU
  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  //FETCH all queries
  useEffect(() => {
    fetch("http://localhost:8080/queries")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQueries(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          bgcolor: "teal",
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardContent>
          {queries.map((query) => {
            return (
              <Button
                key={query.queryId}
                sx={{ margin: "4px" }}
                variant="contained"
                //TÄMÄ EI TOIMI VIELÄ
                onClick={() => {
                  return (
                    <List>
                      {query.questions.map((question) => {
                        console.log(question);
                        return (
                          <ListItem key={question.questionId}>
                            {question.title}
                          </ListItem>
                        );
                      })}
                    </List>
                  );
                }}
              >
                {query.title}
              </Button>
            );
          })}
          <List>
            {questions.map((question) => {
              return (
                <ListItem key={question.questionId}>{question.title}</ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
