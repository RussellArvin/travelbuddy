import React, { useEffect, useState } from 'react';
import ChatWindow from '../../../components/Chatbox/ChatWindow';
import { Container, TextField, Button, Box } from '@mui/material';
import { NextPage } from 'next';
import { api, RouterOutputs } from '../../../utils/api';
import { useRouter } from 'next/router';

type Message = RouterOutputs["plan"]["getChatHistory"]
  
  const Chatbot: NextPage = () => {
    const router = useRouter()
    const [messages, setMessages] = useState<Message>([]);
  
    const [inputValue, setInputValue] = useState('');

    const {
        mutate: sendChatMutation,
        isLoading: isSendChatLoading
    } = api.plan.chat.useMutation()
    

    const {data: chatMessages, isLoading: isChatMessagesLoading } = api.plan.getChatHistory.useQuery({
        id:router.query.id as string
    },{
        enabled:router.isReady
    })

    

    useEffect(() => {
        if(chatMessages){
            setMessages(chatMessages)
        }
    })

    if(isChatMessagesLoading || !chatMessages || isSendChatLoading) return (
        <>
        <h1>Loading</h1>
        </>
    )
  
    const sendMessage = () => {
      if (inputValue.trim() !== '') {
        sendChatMutation(
            {
              id:router.query.id as string,
              message: inputValue
            },
            {
              onSuccess: () => {
                setMessages(chatMessages)
              },
              onError: (error) => {
                console.log(error);
              },
            },
          );
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