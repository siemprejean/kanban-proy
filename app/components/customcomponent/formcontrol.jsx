import PropTypes from 'prop-types';

import { FormControl, Input, TextField } from '@mui/material';
import { useCallback } from 'react';

const MuiTextField = ({
  title,
  value,
  onChange,
  inputKey,
  defaultValue,
  className,
  ...rest // This grabs any extra props like InputProps, type, etc.
}) => {
  return (
    <FormControl variant="outlined" className={className}>
      <h5>{title}</h5>
      <TextField
        defaultValue={defaultValue}
        value={value}
        id={inputKey}
        onChange={onChange}
        onBlur={() => console.log('El campo ha perdido el foco')}
        onFocus={() => console.log('El campo ha obtenido el foco')}
        {...rest} // This is the key part that was missing!
      />
    </FormControl>
  );
};

export default MuiTextField;
