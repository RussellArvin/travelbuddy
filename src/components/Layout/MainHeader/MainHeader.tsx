import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

interface MainHeaderProps {
  toggleNav: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ toggleNav }) => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPath, setCurrentPath] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleNav}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" onClick={() => {
            
          }} sx={{ flexGrow: 1, cursor: "pointer" }}>
            TravelBuddy.AI
          </Typography>
          {currentPath == "/chat" &&
            <Typography
              variant="h6"
              component="div"
              onClick={() => {
                window.open("https://www.singtel.com/personal/products-services/mobile/roaming/all-plans", "_blank")
              }}
              sx={{
                margin: "0 3vw 0 3vw", cursor: "pointer", '&:hover': {
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
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
