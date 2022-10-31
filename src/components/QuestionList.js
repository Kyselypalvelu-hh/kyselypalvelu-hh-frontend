import { Card, Box, CardContent, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";

//TESTIDATA (TÄHÄN TULEE FETCH JAVA REST-APISTA)
//FETCH QUESTIONS

const testQuestionList = [
  "QuestionOne",
  "QuestionTwo",
  "QuestionThree",
  "QuestionFour",
  "QuestionFive",
];

export const QuestionList = () => {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      });
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
            {testQuestionList.map((question) => {
              //KEY TULEE OLEMAAN DATA.ID TYYPPINEN
              return <ListItem key={question}>{question}</ListItem>;
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
