import React from 'react';
import { Card, Typography, CardContent } from '@mui/material';
import { Height } from '@mui/icons-material';
import { fontWeight } from '@mui/system';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const userStyle = {
    margin: '10px',
    backgroundColor: '#e0f7fa',
    alignSelf: 'flex-end',
    overflow: 'visible',
  };

  const assistantStyle = {
    margin: '10px',
    backgroundColor: '#ffe0b2',
    alignSelf: 'flex-start',
    overflow: 'visible',
  };

  return (
    <Card style={{ ...(isUser ? userStyle : assistantStyle)}}>
  <CardContent>
    <Typography color="textSecondary" gutterBottom>
      {isUser ? 'You' : 'Assistant'}
    </Typography>
    <Typography variant="body2" component="p">
      {message.content}
    </Typography>
  </CardContent>
</Card>
  );
};

export default ChatMessage;