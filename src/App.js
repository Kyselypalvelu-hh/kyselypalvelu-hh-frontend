import Box from "@mui/material/Box";
import { QuestionList } from "./components/QuestionList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewAnswers from "./components/ViewAnswers";
import Navigation from "./components/Navigation";
import { Typography } from "@mui/material";
import ViewAnswersTab from "./components/ViewAnswerTab";
import Test from "./components/Test";
import { RestHomePage } from "./components/RestHomePage";
import ScrollButton from "./components/ScrollButton";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation></Navigation>}>
            <Route
              path="/questionlist"
              element={<QuestionList></QuestionList>}
            ></Route>
            <Route
              path="/viewanswers"
              element={<ViewAnswersTab></ViewAnswersTab>}
            ></Route>
            <Route
              path="/appguide"
              element={<RestHomePage></RestHomePage>}
            ></Route>
            <Route path="/test" element={<Test></Test>}></Route>
            <Route
              path="*"
              element={<Typography>Routing error</Typography>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ScrollButton />
    </Box>
    
  );
}

export default App;
