import React from 'react';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Welcome to LinkedOut</h1>
      <h2>Available Job Postings</h2>
      /* List of job postings */
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
};

export default HomePage;