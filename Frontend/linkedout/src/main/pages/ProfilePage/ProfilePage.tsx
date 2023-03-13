import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Card, Button, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText, TextField, Divider } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import "./ProfilePage.css"

const CandidateProfile = () => {
  return (
    <div className="profile-body">
          <Box sx={{ display: 'flex', fontFamily: 'Russo One'}}>
            <Card className="profile-name-card" sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia 
                  component="img"
                  height="200vw"
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
                    image='https://picsum.photos/200/200'
                    alt='profile picture'
                    className="profile-picture"
                  />
                </Box>
                <Box className="profile-information">
                  <Typography variant="h3" component="div">
                    Jane Doe
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    (She/Her)
                  </Typography>
                  <Typography variant="subtitle1" className="profile-bio">Data Scientist @ Google</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" component="div" className="profile-resume">
                    University of Waterloo
                  </Typography>
                  <Typography variant="subtitle1" component="div" className="profile-resume">
                    Google
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card className="profile-skill-card">
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
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
            <div className="profile-description">
              <Typography variant="h5">Description</Typography>
              <p>Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.</p>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="profile-experiences">
            <Typography variant="h5" component="div" className="profile-experience-title">
              Experience
            </Typography>
            <Box>
              <Box className="profile-experience">
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">YouTube</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-experience">
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">Google</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-experience"> 
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">Google</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
                </Box>
              </Box>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="profile-educations">
              <Typography variant="h5" component="div" className="profile-experience-title">
                Education
              </Typography>
              <Box>
                <Box className="profile-education">
                  <Typography variant="h6">University of Waterloo</Typography>
                  <Typography variant="subtitle1">Bachelors of Software Engineering</Typography>
                  <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
                </Box>
              <Divider variant="middle" />
                <Box className="profile-experience">
                  <Typography variant="h6">East High</Typography>
                  <Typography variant="subtitle1"></Typography>
                  <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
                </Box>
              </Box>
            </div>
          </Card>
        </div>
    );
};

const EmployerProfile = () => {
  return (
    <div className="profile-body">
          <Box sx={{ display: 'flex', fontFamily: 'Russo One'}}>
            <Card className="profile-name-card" sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia 
                  component="img"
                  height="200vw"
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
                    image='https://picsum.photos/200/200'
                    alt='profile picture'
                    className="profile-picture"
                  />
                </Box>
                <Box className="profile-information">
                  <Typography variant="h3" component="div">
                    Company Co
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    Est. 2023
                  </Typography>
                  <Typography variant="subtitle1" className="profile-bio">Securing Data is our Priority</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" component="div" className="profile-resume">
                    Cloud
                  </Typography>
                  <Typography variant="subtitle1" component="div" className="profile-resume">
                    CyberSecurity
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card className="profile-skill-card">
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                <li key={`section-${"Plang"}`}>
                  <ul>
                    <ListSubheader>{`Branches`}</ListSubheader>
                    {["Montreal", "Toronto", "Laval"].map((item) => (
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
            <div className="profile-description">
              <Typography variant="h5">About Us</Typography>
              <p>Company Co, we believe in ...</p>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="profile-experiences">
            <Typography variant="h5" component="div" className="profile-experience-title">
              Our Open Job Postings
            </Typography>
            <Box>
              <Box className="profile-experience">
                <Typography variant="h6">Cloud</Typography>
                <Typography variant="subtitle1">Data Analyst</Typography>
                <Typography variant="body2">"Position description"</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-experience">
                <Typography variant="h6">Cyber Security</Typography>
                <Typography variant="subtitle1">Software Developer</Typography>
                <Typography variant="body2">"Position description"</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-experience"> 
                <Typography variant="h6">Cloud</Typography>
                <Typography variant="subtitle1">UX/UI Designer</Typography>
                <Typography variant="body2">"Position description"</Typography>
                </Box>
              </Box>
            </div>
          </Card>
        </div>
    );
};


const ProfilePage = () => {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login');
      };
      const handleRegisterClick = () => {
        navigate('/register');
      }
    
    const isCandidate = false; // Switches to EmployerProfile when set to false
    return(
      <body>
        <div className="home-header">
          <a id="logo" href="http://localhost:3000/">
            <img src="img/LinkedoutLogo2.png" alt="LinkedOut" className="home-logo" />
          </a>
          <div className="home-search-bar">
            <TextField size="small" id="outlined-basic" label="Search" placeholder="Search job postings"/>
          </div>
          <div className="home-buttons">
            <Button text-transform="capitalize" onClick={handleLoginClick}>Login</Button>
            <Button onClick={handleRegisterClick}>Register</Button>
          </div>
        </div>
        {isCandidate ? <CandidateProfile /> : <EmployerProfile />}
      </body>
      
    )
}


export default ProfilePage;
