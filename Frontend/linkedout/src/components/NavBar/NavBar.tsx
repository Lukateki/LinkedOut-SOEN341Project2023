import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CardMedia, TextField } from '@mui/material';
import { isUserLoggedIn } from "../../main/pages/LoginPage/types";
import { search_jobs } from '../../axiosconfig';

import "./NavBar.css"
import Cookies from "universal-cookie";

const NavBar = ({jobPostings, setSearchResults}) => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleRegisterClick = () => {
      navigate('/register');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogoutClick = () => {
      const cookies = new Cookies();
      cookies.remove('auth-token');
      
      navigate('/');
    };

    const handleSearch = (e) => {
      e.preventDefault()};
    const handleSearchChange = (e) => {
      if (!e.target.value) return setSearchResults(jobPostings)

      const resultsArray = jobPostings.filter(jobPosting => jobPosting.title.includes(e.targer.value) || jobPosting.body.includes(e.target.value))
      setSearchResults(resultsArray)
    }
    
    return(
      <div style={{ backgroundColor: "white"}}>
        <div className="navbar-header">
          <div className="navbar-left-header">
            <span className="navbar-company-name">Linked</span>
              <a id="logo" href="http://localhost:3000/">
                <img src={"/img/LinkedoutLogo2.png"} alt="LinkedOut" className="home-logo" />
              </a>
              <form className="navbar-search-bar" onSubmit={handleSearch}>
                <input 
                  className="search_input"
                  type="text"
                  id="search"
                  onChange={handleSearchChange}
                />
              </form>
            </div>
            <div className="navbar-right-header">
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
                <Button onClick={handleProfileClick}>Profile</Button>
                <Button onClick={handleLogoutClick}>Logout</Button>
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
