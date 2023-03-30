import React, { useState, useEffect } from 'react';
import { Typography} from '@mui/material';
import { get_all_jobs } from '../../../axiosconfig';
import NavBar from '../../../components/NavBar/NavBar';
import { Button } from '@mui/material';
import {retrieve_session_user} from "../../../axiosconfig";
import { auth_token_cookie_name } from "../../../axiosconfig"
import Cookies from "universal-cookie";


import { useNavigate, generatePath } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);
  const [isRecruiter, setIsRecruiter] = useState(false);
  


  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await get_all_jobs();
        setJobPostings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const isUserARecruiter = async() => {
      try {
      const token = new Cookies().get(auth_token_cookie_name)
      const response = await retrieve_session_user(token);
      console.log(response.data.isRecruiter);
      const temp = response.data.isRecruiter
      setIsRecruiter(temp);
      } catch(error){
        console.log(error);
      }
    };
    isUserARecruiter();
    
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
              <h3 onClick={() => goToJobDetails(String(jobPosting.id))}>{jobPosting.title}</h3>
              <p>{jobPosting.description}</p>
              {/* Include an apply button (blocked for users that are not authenticated) */}
            </li>
          ))}
        </ul>
        { isRecruiter/*check if its a recruiter*/ && (
        <div className='add-job-btn'>
          <Button 
            variant="contained"
            onClick={() => {
              navigate("/addJob");
            }}
          > 
          + 
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
