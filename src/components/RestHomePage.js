import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import web from "../images/classdiagramWeb.JPG";

export const RestHomePage = () => {
  return (
    <Box sx={{ margin: "25px 0px 0px 25px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Get all queries: </Typography>
        <Button target="_blank" href="http://localhost:8080/queries">
          http://localhost:8080/queries
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Get a single query by ID: </Typography>
        <Button target="_blank" href="http://localhost:8080/queries/1">
          http://localhost:8080/queries/(queryID)
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Get all answers from selected query: </Typography>
        <Button target="_blank" href="http://localhost:8080/queryanswers/1">
          http://localhost:8080/queryanswers/(queryID)
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Get all questions from selected query: </Typography>
        <Button
          target="_blank"
          href="http://localhost:8080/queries/1/opentextquestions"
        >
          http://localhost:8080/queries/(queryID)/opentextquestions
        </Button>
        <Box position="relative">
          <img src={web} alt="web"></img>
          <img src="" alt=""></img>
          <img src="" alt=""></img>
          <img src="" alt=""></img>
        </Box>
      </Box>
    </Box>
  );
};
