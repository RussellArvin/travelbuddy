import React from 'react';
import ChatMessage from './ChatMessage';
import { Box } from '@mui/material';
import { RouterOutputs } from '../../utils/api';

type Message = RouterOutputs["plan"]["getChatHistory"]

interface ChatWindowProps {
  messages: Message;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        height: '80vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </Box>
  );
};

export default ChatWindow;