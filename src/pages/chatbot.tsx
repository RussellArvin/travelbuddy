import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from '../components/Chatbox/ChatWindow';
import { Container, TextField, Button, Box } from '@mui/material';
import { NextPage } from 'next';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', content: 'WOW' },
    { role: 'assistant', content: 'WOW' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { role: 'user', content: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <Container>
      <ChatWindow messages={messages} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <TextField
          label="Type a message..."
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button
  variant="outlined"
  onClick={sendMessage}
  sx={{
    marginLeft: '10px',
    color: '#05668D', // Set text color
    borderColor: '#05668D', // Set border color
    '&:hover': {
      borderColor: '#05668D', // Keep border color on hover
      backgroundColor: 'rgba(5, 102, 141, 0.04)' // Optional: Change background on hover
    }
  }}
>
  Send
</Button>

      </Box>
    </Container>
  );
};

export default Chatbot;