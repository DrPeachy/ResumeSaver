import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";



const pages = ['Home', 'Dashboard', 'Workspace'];
const pagesLinks = {
  Home: '/',
  Dashboard: '/dashboard',
  Workspace: '/workspace',
  Profile: '/profile',
  Logout: '/logout',
  Login: '/login',
  Signup: '/signup'
};
const loginSettings = ['Profile', 'Logout'];
const logoutSettings = ['Login', 'Signup'];

const Template = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState(logoutSettings);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedIn = await checkToken();
      setIsAuthenticated(isLoggedIn);
    };

    checkAuthentication();
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      setSettings(loginSettings);
    } else {
      setSettings(logoutSettings);
    }
  }, [isAuthenticated]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleLogout = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkToken = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/checkToken`);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      if (error.response.status === 401) {
        return false;
      }
    }
  }



  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={pagesLinks[page]}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={isAuthenticated?"/assets/logo.png":""} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting} 
                    onClick={handleCloseUserMenu} 
                    component={Link}
                    to={pagesLinks[setting]}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" component="main" sx={{ pt: 2, pb: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Template;