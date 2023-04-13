import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieve_applicant_education, retrieve_applicant_experience, retrieve_recruiter_jobs } from "../../../axiosconfig";

export const useApplicantProfile = () => {
    const { id: userIdVisit } = useParams();
    
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

    const getJobPostings = (data) => {
      retrieve_recruiter_jobs(String(data.recruiter_id)).then(s => {
        setJobPostings(s.data)
      })
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
      return { userIdVisit, Id, setId, userId, setUserId, navigatetBackToHome, setIsCandidate, getJobPostings, jobPostings, setJobPostings, isCandidate, getExperience, experience, setExperience, navigateToExperience, navigateToEducation, navigateBackFromExperience, navigateBackFromEducation, recentExperience, getEducation, education, setEducation, recentEducation };
}