import React, { useState, useEffect } from 'react';
import { get_all_jobs } from '../../../axiosconfig';
import NavBar from '../../../components/NavBar/NavBar';
import { useNavigate, generatePath } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
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

  const goToJobDetails = (job_id: string) => {
    const path = generatePath("/job/:id", { id: job_id })
    navigate(path);
  }

  return (
    <div className="home-container">
      <NavBar/>
      <div className="home-content">
        <h1>Welcome to LinkedOut</h1>
        <h2>Available Job Postings</h2>
        <ul className="homepage-job-postings">
          {jobPostings.map((jobPosting) => (
            <li key={jobPosting.id}>
              <h3 onClick={() => goToJobDetails(String(jobPosting.id))}>{jobPosting.title}</h3>
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
