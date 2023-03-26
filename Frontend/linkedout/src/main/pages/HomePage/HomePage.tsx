import React, { useState, useEffect } from 'react';
import { Typography} from '@mui/material';
import { get_all_jobs } from '../../../axiosconfig';
import './HomePage.css';
import NavBar from '../../../components/NavBar/NavBar';
import { color } from '@mui/system';

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
      <NavBar/>
      <div className="home-content">
        <Typography variant="h3" component="div" fontSize={35} sx={{fontFamily:'Calibri' ,fontWeight: 'bold', color: '#212121'}}>
        Welcome to
        <span className="home-company-name">Linked</span>
        <img src="img/LinkedoutLogo2.png" alt="LinkedOut" className="home-logo" />
                    </Typography>
        <div className='home-content-search'>
        <Typography variant="subtitle1" component="div" fontSize={20} align={'left'} sx={{fontWeight: 'bold', textDecoration: 'underline', color: '#212121'}} >
        Available Job Postings:
                    </Typography>
                    </div>
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
