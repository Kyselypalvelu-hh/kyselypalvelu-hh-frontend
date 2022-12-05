import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import "../index.css";
export default function CheckboxQuestion(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">{props.question.questionIf}</FormLabel>
        <FormGroup>
          {props.question.choiceOptions.map((option) =>
          <FormControlLabel
          control={<Checkbox name={option.option}
          key={option.optionId}
          />
          }
          label={option.option}
        />
          )}
  </FormGroup>
      </FormControl>
      </Box>
  );
}
