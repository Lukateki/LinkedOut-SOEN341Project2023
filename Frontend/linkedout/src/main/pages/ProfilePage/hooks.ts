import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useApplicantProfile = () => {
    const [experience, setExperience] = useState([]);

    const navigate = useNavigate();

    const getExperience = () => {
        setExperience([
          {"title" : "Data Scientist",
           "company" : "Google",
           "start_date" : "2020-01-01",
           "end_date" : "2021-01-01",
           "description" : "As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database."
           },
           {"title" : "Software Engineer",
            "company" : "Facebook",
            "start_date" : "2019-01-01",
            "end_date" : "2020-01-01",
            "description" : "As a software engineer for facebook, I was tasked with developing the backend for the facebook marketplace."
          },
          {"title" : "Software Engineer",
            "company" : "Amazon",
            "start_date" : "2018-01-01",
            "end_date" : "2019-01-01",
            "description" : "As a software engineer for amazon, I was tasked with developing the backend for the amazon marketplace."
          },
        ]);
      }

    const scrollTo = (location) =>{
        window.scrollTo({
          top: location, 
        });
      };
    
      const navigateToExperience = () => {
        scrollTo(0);
        navigate("/profile-edit-experience");
      }
    
      const navigateToEducation = () => {
        scrollTo(0);
        navigate("/profile-edit-education");
      }
      
      const navigateBackFromExperience = () => {
        navigate("/profile");
      }

      const navigateBackFromEducation = () => {
        navigate("/profile");
      }

      return { getExperience, experience, setExperience, navigateToExperience, navigateToEducation, navigateBackFromExperience, navigateBackFromEducation };
}