import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Card, Button, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import "./ProfilePage.css"

const ProfilePage = () => {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login');
      };
      const handleRegisterClick = () => {
        navigate('/register');
      }
    
    
    return(
      <body>
        <div className="home-header">
          <div className="home-search-bar">
            <input type="text" placeholder="Search job postings" />
          </div>
          <div className="home-buttons">
            <Button onClick={handleLoginClick}>Login</Button>
            <Button onClick={handleRegisterClick}>Register</Button>
          </div>
        </div>

        <div className="profile-body">
          <Box sx={{ display: 'flex' }}>
            <Card className="profile-name-card" sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia 
                  component="img"
                  height="250vw"
                  image='https://source.unsplash.com/random'
                  alt='background picture'
                >
                </CardMedia>
              <CardContent sx={{ display: 'flex'}}>
                <div className="profile-btn">
                  <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadOutlinedIcon />
                  </IconButton>
                </div>
                <Box> 
                  <CardMedia 
                    component="img"
                    height="100vw"
                    image='https://source.unsplash.com/random'
                    alt='profile picture'
                    
                    className="profile-picture"
                  />
                </Box>
                <Box>
                  <Typography variant="h3" component="div" className="profile-name">
                    Jane Doe
                  </Typography>
                  <Typography variant="subtitle1" component="div" className="profile-name">
                    (She/Her)
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card className="profile-skill-card" sx={{ display: 'flex' }}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 400,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                <li key={`section-${"Plang"}`}>
                  <ul>
                    <ListSubheader>{`Skills`}</ListSubheader>
                    {["Python", "C++", "Java", "Go", "Javascript", "Ruby", "Rust", "Django", "SQL", "Jenkins"].map((item) => (
                      <ListItem key={`item-"PLang"-${item}`}>
                        <ListItemText primary={`${item}`} />
                      </ListItem>
                    ))}
                  </ul>
                </li>

              </List>
            </Card>
          </Box>

          <Card className="profile-card">
            <div className="profile-interests">
                <div className="profile-interests-content">
                  <Typography variant="h5">Description</Typography>
                  <p>Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.</p>
                </div>
            </div>
          </Card>

          <Card className="profile-card">
          <div className="profile-experience">
          <Typography variant="h4" component="div" className="profile-experience-title">
            Relevant Experience
          </Typography>
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
          </Card>
        </div>
      </body>
      
    )
}

export default ProfilePage;
