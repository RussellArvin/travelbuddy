import React, { useState } from 'react';
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
          <Button variant="contained" color="primary" onClick={sendMessage} sx={{ marginLeft: '10px' }}>
            Send
          </Button>
        </Box>
      </Container>
    );
  };
  
  export default Chatbot;