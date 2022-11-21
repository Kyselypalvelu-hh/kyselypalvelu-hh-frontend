import Box from '@mui/material/Box';
import { QuestionList } from './components/QuestionList';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ViewAnswers from './components/ViewAnswers';

function App() {
  return (
    <Box>
      <QuestionList />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionList></QuestionList>}></Route>
          <Route path="/viewanswers:id" element={<ViewAnswers></ViewAnswers>}></Route>
      </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
