import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, CardMedia, TextField } from '@mui/material';
import { isUserLoggedIn } from "../../main/pages/LoginPage/types";
import ToggleDark from '../../components/toggleDark';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import Cookies from "universal-cookie";
import { NavBarProps } from './types';
import "./NavBar.css"

const NavBar = (props?: NavBarProps) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = React.useState(true);
    const location = useLocation();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
      navigate('/register');
    };

    const handleLogoutClick = () => {
      const cookies = new Cookies();
      cookies.remove('auth-token');
      if (location.pathname === "/" ) {
        window.location.reload();
      } else {
        navigate('/');
      }
    };

    return(
      <div style={{ backgroundColor: "white"}}>
        <div className="navbar-header">
          <div className="navbar-left-header">
            <span className="navbar-company-name">Linked</span>
              <a id="logo" href="http://localhost:3000/">
                <img src={"/img/LinkedoutLogo2.png"} alt="LinkedOut" className="home-logo" />
              </a>
              <div className="navbar-search-bar">
                <TextField 
                  size="small" 
                  id="outlined-basic" 
                  label="Search" 
                  placeholder="Search job postings"
                  onChange={props.searchFunction}
                />
            </div>
          </div>
            <div className="navbar-right-header">
                  <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                      <ToggleDark
                        toggleDark={() => {
                          setDarkMode(!darkMode);
                          changeTheme(darkMode ? themes.light : themes.dark);
                        }}
                      />
                    )}
                  </ThemeContext.Consumer>
                  
              {isUserLoggedIn() ? (
              <>
                <Box>
                  <a id="profile" href="http://localhost:3000/profile">
                  <CardMedia 
                    component="img"
                    height="40px"
                    image='https://picsum.photos/200/200'
                    alt='profile picture'
                    className="navbar-picture"
                  />
                  </a>
                </Box>
                <div className="navbar-buttons"> 
                  <Button onClick={handleLogoutClick}>Logout</Button>
                </div>
              </>
              ):(
                <>
                  <div className="navbar-buttons">
                  <Button onClick={handleLoginClick}>Login</Button>
                  <Button onClick={handleRegisterClick}>Register</Button>
                </div>
              </>
            )
            } 
          </div>
        </div>
      </div>
    )
}

export default NavBar;
