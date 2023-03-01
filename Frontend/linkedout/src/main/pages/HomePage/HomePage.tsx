import React, { useState, useEffect } from 'react';
import { get_all_jobs } from '../../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {

  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleRegisterClick = () => {
    navigate('/register');
  };

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await get_all_jobs();
        setJobPostings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobPostings();
  }, []);

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
        <ul className="homepage-job-postings">
          {jobPostings.map((jobPosting) => (
            <li key={jobPosting.id}>
              <h3>{jobPosting.title}</h3>
              <p>{jobPosting.description}</p>
              {/* Include an apply button (blocked for users that are not authenticated) */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
