import React from 'react';
import { Card, Typography, CardContent } from '@mui/material';
import { Height } from '@mui/icons-material';

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
    backgroundColor: '#427aa1',
    alignSelf: 'flex-end',
    overflow: 'visible',
  };

  const assistantStyle = {
    margin: '10px',
    backgroundColor: '#679436',
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