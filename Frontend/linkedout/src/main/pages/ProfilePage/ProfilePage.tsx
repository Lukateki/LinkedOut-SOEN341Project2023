import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"

const ProfilePage = () => {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login');
      };
      const handleRegisterClick = () => {
        navigate('/register');
      };

    
    
    return(
      <body>
        <div className="home-header">
          <div className="home-search-bar">
            <input type="text" placeholder="Search job postings" />
          </div>
          <div className="home-buttons">
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-name">
            <h2 className="name">Jane Doe<span className="pronouns"><text>(She/Her)</text></span></h2>
          </div>
          
          <div className="profile-skills">
            <div className="profile-skills-content">
              <h3>Skills:</h3>
              <ul>
                <li>Python</li>
                <li>Django</li>
                <li>Javascript</li>
                <li>Spring</li>
              </ul>
            </div>
          </div>
          <div className="profile-interests">
              <div className="profile-interests-content">
                <h3>A little bit about Jane:</h3>
                <p>Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.</p>
              </div>
          </div>
          <div className="profile-experience">
            <h3 className="profile-experience-title">Relevant Experience:</h3>
            <ul>
              <li className="profile-experience-entry">
                <h4>Youtube Data Scientist</h4>
                <p className="profile-experience-entry-description">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</p>
              </li>
              <li className="profile-experience-entry">
                <h4>Google Data Scientist</h4>
                <p className="profile-experience-entry-description">As a data scientist for Google, I parsed data from Google's large search database and created datasets to use in future AI endeavours.</p>
              </li>
            </ul>
          </div>
        </div>
      </body>
      
    )
}

export default ProfilePage;
