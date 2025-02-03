'use client';
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, Typography } from "@mui/material";
import "styles/theme/components/_dateRangePicker.scss"

const BasicDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    // Validar que la fecha de inicio no sea mayor que la de fin
    if (endDate && newValue && newValue.isAfter(endDate)) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className= "boxito" >
        {/* <Typography variant="h6">Selecciona un rango de fechas</Typography> */}
        <DatePicker
          label="Fecha inicio"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Fecha fin"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate} // No permitir seleccionar fechas anteriores a la fecha de inicio
          renderInput={(params) => <TextField {...params} />}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;
