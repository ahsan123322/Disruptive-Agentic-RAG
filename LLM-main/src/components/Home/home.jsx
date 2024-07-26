import React, { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import { AttachFile, InsertDriveFile, Send } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import HomeNav from '../HomeNav';
const Home = () => {
  const [file, setFile] = useState(null);
  const [textFieldStyle, setTextFieldStyle] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setTextFieldStyle({
        backgroundColor: '#90ee90', // Light green background
        color: 'black', // Black text
      });
    }
  };

  const resetFile = () => {
    setFile(null);
    setTextFieldStyle({});
  };

return (
    <div>
        <HomeNav />
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '40px',
                border: '1px solid black',
                padding: '10px',
            }}
        >
            <input
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <IconButton component="span">
                    <AttachFile />
                </IconButton>
            </label>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <IconButton component="span" onClick={resetFile}>
                <SendIcon />
            </IconButton>
        </Box>
    </div>
);
};

export default Home;


