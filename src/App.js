import Box from '@mui/material/Box';
import { QuestionList } from './components/QuestionList';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ViewAnswers from './components/ViewAnswers';
import { Typography } from '@mui/material';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionList></QuestionList>}></Route>
          <Route path="/viewanswers/:id" element={<ViewAnswers></ViewAnswers>}></Route>
          <Route path="*" element={<Typography>Routing error</Typography>}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
