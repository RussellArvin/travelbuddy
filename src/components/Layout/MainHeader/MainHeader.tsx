import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container } from '@mui/material';

interface MainHeaderProps {
  toggleNav: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ toggleNav }) => {
  const [currentPath, setCurrentPath] = useState("");

  // check for pathname
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check the path part of the URL
      const path = window.location.pathname;
      setCurrentPath(path);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#05668D"}}>
          <Container sx={{justifyContent: "flex-start", display:"flex", alignItems: "center", }}>
            {/* <Typography variant="h5" component="div" onClick={() => {
            
          }} sx={{ flexGrow: 1, cursor: "pointer" }}>
            TravelBuddy.AI
          </Typography> */}

            {currentPath == "/chat" &&
              <Typography
                variant="h6"
                component="div"
                onClick={() => {
                  window.open("https://www.singtel.com/personal/products-services/mobile/roaming/all-plans", "_blank")
                }}
                sx={{
                  margin: "0 2vw 0 vw", cursor: "pointer", '&:hover': {
                    color: 'blue', // Change to the desired hover color
                  },
                }}>Find Mobile Plans</Typography>}
            {currentPath == "/chat" &&
              <Typography
                variant="h6"
                component="div" sx={{
                  margin: "0 3vw 0 3vw", cursor: "pointer", '&:hover': {
                    color: 'blue', // Change to the desired hover color
                  },
                }}>Find Stays</Typography>}
          </Container>
          <Button sx={{ color: "white", border: "1px solid white" }} variant="outlined" href="#outlined-buttons">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
