import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieve_applicant_education, retrieve_applicant_experience } from "../../../axiosconfig";

export const useApplicantProfile = () => {
    const [isCandidate, setIsCandidate] = useState<boolean>(false);

    const [userId, setUserId] = useState<number>(0);
    const [Id, setId] = useState<number>(0);

    const [experience, setExperience] = useState([]);
    const [recentExperience, setRecentExperience] = useState<string>("");

    const [education, setEducation] = useState([]);
    const [recentEducation, setRecentEducation] = useState<string>("");

    const [jobPostings, setJobPostings] = useState([]);

    const navigate = useNavigate();

    const getExperience = (data) => {
        retrieve_applicant_experience(String(data.applicant_id)).then(s => {
          setExperience(s.data)
          setRecentExperience(s.data[0].company)
      })
      }
    
    const getEducation = (data) => {
      retrieve_applicant_education(String(data.applicant_id)).then(s => {
        setEducation(s.data)
        setRecentEducation(s.data[0].school)
    })
    }

    const getJobPostings = () => {
      setJobPostings([
        {"title" : "Software Engineer",
          "company" : "Google",
          "location" : "Mountain View, CA",
          "description" : "As a software engineer for google, you will be responsible for developing the backend for the google search engine.",
          "requirements" : ["Bachelors of Computer Science", "2+ years of experience"],
          "salary" : "100,000 - 150,000",
          "start_date" : "2021-01-01",
          "end_date" : "2021-06-01",
          "posting_date" : "2021-05-01",
          "application_link" : "https://www.google.com"
        },
        {"title" : "Data Scientist",
          "company" : "Google",
          "location" : "Mountain View, CA",
          "description" : "As a data scientist for google, you will be responsible for developing the backend for the google search engine.",
          "requirements" : ["Bachelors of Computer Science", "2+ years of experience"],
          "salary" : "100,000 - 150,000",
          "start_date" : "2021-01-01",
          "end_date" : "2021-06-01",
          "posting_date" : "2021-05-01",
          "application_link" : "https://www.google.com"
        },
        {"title" : "Software Engineer",
          "company" : "Google",
          "location" : "Mountain View, CA",
          "description" : "As a software engineer for google, you will be responsible for developing the backend for the google search engine.",
          "requirements" : ["Bachelors of Computer Science", "2+ years of experience"],
          "salary" : "100,000 - 150,000",
          "start_date" : "2021-01-01",
          "end_date" : "2021-06-01",
          "posting_date" : "2021-05-01",
          "application_link" : "https://www.google.com"
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
      const navigatetBackToHome = () => {
        navigate("/");
      }
      return { Id, setId, userId, setUserId, navigatetBackToHome, setIsCandidate, getJobPostings, jobPostings, setJobPostings, isCandidate, getExperience, experience, setExperience, navigateToExperience, navigateToEducation, navigateBackFromExperience, navigateBackFromEducation, recentExperience, getEducation, education, setEducation, recentEducation };
}