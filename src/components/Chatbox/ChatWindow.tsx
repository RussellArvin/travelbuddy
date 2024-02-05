import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Box } from '@mui/material';
import { RouterOutputs } from '../../utils/api';

type Message = RouterOutputs["plan"]["getChatHistory"]

interface ChatWindowProps {
  messages: Message;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      ref={chatWindowRef} // Add ref to the Box element
      sx={{
        maxWidth: '1000px',
        margin: '0 auto',
        height: '80vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        padding: "1vw",
        border: '1px solid #ccc', // Optional: Add a border for better visibility
        borderRadius: '8px', // Optional: Add border-radius for better aesthetics
      }}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </Box>
  );
};

export default ChatWindow;