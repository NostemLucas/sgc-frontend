import React from 'react';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

interface Props{
    value:any,
    onChange:any,
    error:any,
    helperText:any,
    name:any,
    label:string,
    disable:boolean
}
const FormattedInputs = ({ value, onChange, error, helperText, name,label,disable}:Props) => {
  return (
    <NumericFormat
      customInput={TextField}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      disabled={disable}
      error={error}
      helperText={helperText}
   

    />
  );
};

export default FormattedInputs;
