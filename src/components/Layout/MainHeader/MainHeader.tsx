import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

export const MainHeader = () => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  // check for pathname
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check the path part of the URL
      const path = window.location.pathname;
      setCurrentPath(path);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#05668D" }}>
          <Container sx={{ justifyContent: "flex-start", display: "flex", alignItems: "center", }}>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => { router.push("/") }}>
              <img src={"https://travelbuddy-public-images.s3.ap-southeast-1.amazonaws.com/topphoto.png"} alt="Logo" style={{ height: '70px', marginRight: '10px', padding: "4px" }} />
              <Typography variant="h5" component="div">TravelBuddy.AI</Typography>
            </div>
            {currentPath.includes("plans") &&
              <Typography
                variant="h6"
                component="div"
                onClick={() => {
                  window.open("https://www.singtel.com/personal/products-services/mobile/roaming/all-plans", "_blank")
                }}
                sx={{
                  margin: "0 2vw 0 4vw", cursor: "pointer", '&:hover': {
                    color: 'blue', // Change to the desired hover color
                  },
                }}>Find Mobile Plans</Typography>}
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
