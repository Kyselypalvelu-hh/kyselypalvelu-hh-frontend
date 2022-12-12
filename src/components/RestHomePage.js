import { Button, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import classWebDiagram from "../images/classdiagramWeb.JPG";
import javaWebDiagram from "../images/javadiagramWeb.JPG";
import javaFormatter from "../images/javadigramformatterWeb.JPG";
import relationDiagram from "../images/relationDiagramWeb.JPG";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const RestHomePage = () => {
  // 4 IMAGES, WANT TO SHOW THE IMAGE WHEN BUTTON IS CLICKED (CHANGES TO TRUE)
  const [images, setImages] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const onClickHandler = (e) => {
    setImages((prev) => ({
      ...prev,
      [e]: !prev[e],
    }));
  };

  return (
    <Box sx={{ margin: "25px 0px 0px 25px" }}>
      <h1>API - Endpoints</h1>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <h1>Class Diagram</h1>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => onClickHandler("one")}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        {images.one && (
          <img
            style={{ width: "100%" }}
            src={classWebDiagram}
            alt="classdiagram"
          ></img>
        )}

        <Box sx={{ display: "flex" }}>
          <h1 style={{ marginTop: "2rem" }}>Java Diagram</h1>
          <IconButton
            sx={{ marginTop: "2rem" }}
            aria-label="delete"
            color="primary"
            onClick={() => onClickHandler("two")}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        {images.two && (
          <img
            style={{ width: "100%" }}
            src={javaWebDiagram}
            alt="javadiagram"
          ></img>
        )}

        <Box sx={{ display: "flex" }}>
          <h1 style={{ marginTop: "2rem" }}>Java Formatter Diagram</h1>
          <IconButton
            sx={{ marginTop: "2rem" }}
            aria-label="delete"
            color="primary"
            onClick={() => onClickHandler("three")}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        {images.three && (
          <img
            style={{ width: "100%" }}
            src={javaFormatter}
            alt="javaformatter"
          ></img>
        )}

        <Box sx={{ display: "flex" }}>
          <h1 style={{ marginTop: "2rem" }}>Relation Diagram</h1>
          <IconButton
            sx={{ marginTop: "2rem" }}
            aria-label="delete"
            color="primary"
            onClick={() => onClickHandler("four")}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        {images.four && (
          <img
            style={{ width: "100%" }}
            src={relationDiagram}
            alt="realtiondiagram"
          ></img>
        )}
      </Box>
    </Box>
  );
};
