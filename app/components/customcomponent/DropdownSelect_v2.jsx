import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";


const DropdownSelect_v2 = ({ label, options, className, onChange, type }) => {
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
