import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioQuestion(props){
    return (
        <FormControl>
          <FormLabel id={props.question.questionId}>{props.question.questionIf}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {props.question.choiceOptions.map((option) => (
            <FormControlLabel key = {option.optionId} value={option.optionId} control={<Radio />} label={option.option} />
          ))}
          </RadioGroup>
        </FormControl>
      );
    }