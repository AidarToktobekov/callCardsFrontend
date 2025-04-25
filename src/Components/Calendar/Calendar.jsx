import React, {useState} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Box} from '@mui/material';
import dayjs from 'dayjs';

const Calendar = ({ setState }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleChange = (newDate) => {
    setSelectedDate(newDate);
    setState({
      createdAt: newDate.startOf('month').format('YYYY-MM-DD'),
      finishedAt: newDate.endOf('month').format('YYYY-MM-DD'),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DatePicker
          views={['year', 'month']}
          label="Select Month and Year"
          minDate={dayjs('2000-01-01')}
          maxDate={dayjs('2100-12-31')}
          value={selectedDate}
          onChange={handleChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
