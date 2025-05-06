import React, { useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';

const OtpInput = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box display="flex" gap={2} justifyContent="center">
      {otp.map((value, index) => (
        <TextField
          key={index}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputRef={(el) => (inputRefs.current[index] = el)}
          inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: 24 } }}
          sx={{ width: 60, '& .MuiOutlinedInput-root': { height: 60 } }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;