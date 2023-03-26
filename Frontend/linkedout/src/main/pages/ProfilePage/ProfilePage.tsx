import React from "react";
import { IconButton, Card, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText, Divider } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import "./ProfilePage.css";
import NavBar from '../../../components/NavBar/NavBar';

export const CandidateProfile = () => {
  return (
    <div className="profile-body">
      <Box className="profile-cards">
        <Box className="profile-first-cards">
          <Card className="profile-name-card">
              <CardMedia 
                component="img"
                height="200vw"
                image='https://source.unsplash.com/random'
                alt='background picture'
              >
              </CardMedia>
              <CardContent sx={{ display: 'flex'}}>
                <div className="profile-upload-wallpaper-btn">
                  <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadOutlinedIcon />
                  </IconButton>
                </div>
                <Box sx={{ display: 'flex', paddingLeft: '2em'}}>
                  <Box>
                    <CardMedia 
                      component="img"
                      height="150vw"
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
                </Box>
                <Box className="profile-summary">
                  <Typography variant="subtitle1" component="div">
                    University of Waterloo
                  </Typography>
                  <Typography variant="subtitle1" component="div">
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

          <Card className="profile-description">
            <Typography variant="h5" component="div" className="profile-description-title">Description</Typography>
            <Typography variant="body2" className="profile-description-text">
              Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.
            </Typography>
          </Card>

          <Card className="profile-jobs">
            <Typography variant="h5" className="profile-jobs-title">
              Experience
            </Typography>
            <Box className="profile-jobs-text">
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">YouTube</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">Google</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-jobs-text-details"> 
                <Typography variant="h6">Data Scientist</Typography>
                <Typography variant="subtitle1">Google</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
                </Box>
              </Box>
          </Card>

          <Card className="profile-jobs">
            <Typography variant="h5" component="div" className="profile-jobs-title">
              Education
            </Typography>
            <Box className="profile-jobs-text">
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">University of Waterloo</Typography>
                <Typography variant="subtitle1">Bachelors of Software Engineering</Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
            <Divider variant="middle" />
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">East High</Typography>
                <Typography variant="subtitle1"></Typography>
                <Typography variant="body2">As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database.</Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </div>
    );
};

const EmployerProfile = () => {
  return (
    <div className="profile-body">
      <Box className="profile-cards">
        <Box className="profile-first-cards">
          <Card className="profile-name-card">
            <CardMedia 
              component="img"
              height="200vw"
              image='https://source.unsplash.com/random'
              alt='background picture'
            >
            </CardMedia>
            <CardContent sx={{ display: 'flex'}}>
              <div className="profile-upload-wallpaper-btn">
                <IconButton aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <FileUploadOutlinedIcon />
                </IconButton>
              </div>
              <Box sx={{ display: 'flex', paddingLeft: '2em'}}>
                <Box>
                  <CardMedia 
                    component="img"
                    height="150vw"
                    image='https://picsum.photos/200/200'
                    alt='profile picture'
                    className="profile-picture"
                  />
                </Box>
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
              <Box className="profile-summary">
                <Typography variant="subtitle1" component="div">
                  Cloud
                </Typography>
                <Typography variant="subtitle1" component="div">
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
          
          <Card className="profile-description" >
            <Typography variant="h5" className="profile-description-title">About Us</Typography>
            <Typography variant="body2" className="profile-description-text">
              Have you heard about our Cloud CyberSecurity company? We're so good at keeping your data safe that even the hackers need a permission slip just to attempt a breach! We're like a bouncer at a club, but instead of checking IDs, we're checking for malicious intent. You can trust us with your sensitive information, unless of course you're still using 'password123' as your login, in which case we can't help you.            </Typography>
          </Card>

        <Card className="profile-jobs">
            <Typography variant="h5" component="div" className="profile-jobs-title">
              Our Job Postings
            </Typography>
            <Box className="profile-jobs-text">
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">Data Analyst</Typography>
                <Typography variant="subtitle1">Company Co</Typography>
                <Typography variant="body2">
                  We're looking for a Data Analyst to join our team - someone who can analyze data faster than a hacker can say 'password123'!
                  </Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-jobs-text-details">
                <Typography variant="h6">Software Developer</Typography>
                <Typography variant="subtitle1">Company Co</Typography>
                <Typography variant="body2">
                  We're seeking a skilled Software Developer to join our Cloud CyberSecurity company. You'll be responsible for developing software solutions that ensure our clients' data stays secure. Collaborate with cross-functional teams, write clean and efficient code, and stay up-to-date with emerging trends and technologies. Requirements include a bachelor's degree in Computer Science or Software Engineering, proven experience in Software Development, and proficiency in programming languages such as Java, Python, or C++.
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box className="profile-jobs-text-details"> 
                <Typography variant="h6">UX/UI Designer</Typography>
                <Typography variant="subtitle1">Company Co</Typography>
                <Typography variant="body2">"Position description"</Typography>
              </Box>
            </Box>
        </Card>
      </Box>
    </div>
  );
};


const ProfilePage = () => {
    const isCandidate = true; // Switches to EmployerProfile when set to false
    return(
      <>
        <NavBar/>
        {isCandidate ? <CandidateProfile /> : <EmployerProfile />}
      </>
    )
}


export default ProfilePage;
