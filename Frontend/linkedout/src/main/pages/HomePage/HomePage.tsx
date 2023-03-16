import React, { useState, useEffect } from 'react';
import { get_all_jobs } from '../../../axiosconfig';
import './HomePage.css';
import NavBar from '../../../components/NavBar/NavBar';

const HomePage = () => {

  const [jobPostings, setJobPostings] = useState([]);

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
          <button>Search</button>
        </div>
        <div className="home-buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
      <NavBar/>
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
