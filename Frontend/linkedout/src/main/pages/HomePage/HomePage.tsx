import React, { useState, useEffect } from 'react';
import { get_all_jobs } from '../../../axiosconfig';
import NavBar from '../../../components/NavBar/NavBar';
import { Button, Card, CardContent, Typography } from '@mui/material';
import {retrieve_session_user} from "../../../axiosconfig";
import { auth_token_cookie_name } from "../../../axiosconfig"
import Cookies from "universal-cookie";


import { useNavigate, generatePath } from 'react-router-dom';

import './HomePage.css';
import Footer from '../../../components/Footer/Footer';

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
      <Card className="home-content">
        <Typography className={"welcome-banner"} variant={'h4'}>
          Welcome to
          <span className="home-company-name"> Linked</span>
          <img 
            src="img/LinkedoutLogo2.png" 
            alt="LinkedOut" 
            className="home-logo"
            style={{"marginBottom": "-14px"}} 
          />
        </Typography>
        <Typography className={'available-jobs'}>Jobs of the day: </Typography>
        <CardContent className={"home-jobs-container"}>
          {jobPostings.map(j => {
            return (
              <div key={j.id} onClick={() => goToJobDetails(j.id.toString())}>
                <CardContent key={j.id} className={"grid-item"}>
                  <Typography variant={"h5"} component={"div"}>{j.title}</Typography>
                  <Typography variant={"h6"} component={"div"}>{j.recruiter.company}</Typography>
                  <Typography>{j.city}</Typography>
                  <Typography>Expires: {j.expiry_date}</Typography>
                </CardContent>
              </div>
            )
          })}
        </CardContent>
        { isRecruiter && <div className='add-job-btn'>
          <Button variant="contained"onClick={() => { navigate("/addJob"); }}>+</Button>
        </div>}
      </Card>
      <Footer/>
    </div>
    
  );
};

export default HomePage;
