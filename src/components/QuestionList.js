import { Card, Box, CardContent, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  // Fetch all questions
  //CHANGE URL WHEN DEPLOYED TO HEROKU
  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) =>
          response.json()
          )
      .then((data) => {
        console.log(data);
        setQuestions(data)
      })
      .catch(err => console.log(err.message))
  }, []);

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
          <List>
            {/* List all questions*/}
            {questions.map((question) => {
              return <ListItem key={question.questionId}>{question.title}</ListItem>;
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
