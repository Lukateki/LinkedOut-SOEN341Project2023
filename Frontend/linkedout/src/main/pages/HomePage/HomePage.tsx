import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-search-bar">
          <input type="text" placeholder="Search job postings" />
        </div>
        <div className="home-buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
      <div className="home-content">
        <h1>Welcome to LinkedOut</h1>
        <h2>Available Job Postings</h2>
        <ul /* job postings contents to be added here */>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;