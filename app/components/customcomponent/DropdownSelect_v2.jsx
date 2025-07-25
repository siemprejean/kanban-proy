import React, { useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import 'styles/theme/components/_DropdownSelect_v2.scss';

const DropdownSelect_v2 = ({ label, options, className, onChange, type, disabled }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl fullWidth className={className}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        disabled={disabled} // ✅ This is the fix
      >
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect_v2;
