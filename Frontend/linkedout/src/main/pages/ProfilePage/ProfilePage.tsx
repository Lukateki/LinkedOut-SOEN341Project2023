import React, { useEffect, useState } from "react";
import { IconButton, Card, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText, Divider, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, Select, MenuItem } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import "./ProfilePage.css";
import NavBar from '../../../components/NavBar/NavBar';
import { useApplicantProfile } from './hooks';


export const CandidateProfile = () => {
  const { getExperience ,experience, setExperience, navigateToExperience, navigateToEducation } = useApplicantProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pronoun, setPronoun] = useState("None");
  const [biography, setBiography] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  // const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);

  const [bufferFirstName, setBufferFirstName] = useState("");
  const [bufferLastName, setBufferLastName] = useState("");
  const [bufferPronoun, setBufferPronoun] = useState("");
  const [bufferBiography, setBufferBiography] = useState("");
  const [bufferEmail, setBufferEmail] = useState("");

  const [bufferDescription, setBufferDescription] = useState("");

  const handleClickSummaryDialog = () => {
    setBufferFirstName(firstName);
    setBufferLastName(lastName);
    setBufferPronoun(pronoun);
    setBufferBiography(biography);
    setBufferEmail(email);
    setOpenSummaryDialog(true);
  };

  const handleCloseSummaryDialog = () => {
    setOpenSummaryDialog(false);
  };

  const handleSaveSummaryDialog = () => {
    setFirstName(bufferFirstName);
    setLastName(bufferLastName);
    setPronoun(bufferPronoun);
    setBiography(bufferBiography);
    setEmail(bufferEmail);
    setOpenSummaryDialog(false);
  };

  const handleClickDescriptionDialog = () => {
    setBufferDescription(description);
    setOpenDescriptionDialog(true);
  }

  const handleCloseDescriptionDialog = () => {
    setOpenDescriptionDialog(false);
  };
  const handleSaveDescriptionDialog = () => {
    setDescription(bufferDescription);
    setOpenDescriptionDialog(false);
  };

  const getFirstName = () => {
    setFirstName("Jane");
  }

  const getLastName = () => {
    setLastName("Doe");
  }

  const getPronoun = () => {
    setPronoun("She/Her");
  }

  const getBiography = () => {
    setBiography("Data Scientist @ Google");
  }

  const getEmail = () => {
    setEmail("Jane.Doe@gmail.com");
  }

  const getDescription = () => {
    setDescription("Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.");
  }

  const getEducation = () => {
    setEducation([
      {"school" : "University of Waterloo",
       "degree" : "Bachelors of Software Engineering",
       "start_date" : "2020-01-01",
       "end_date" : "2021-01-01",
       "description" : "As a data scientist for youtube, I was tasked with retrieving relevant information from the videos and performing queries on the largescale database."
       },
       {"school" : "East High",
        "degree" : null,
        "start_date" : "2019-01-01",
        "end_date" : "2020-01-01",
        "description" : "As a software engineer for facebook, I was tasked with developing the backend for the facebook marketplace."
      },
    ]);
  }

  const getSkills = () => {
    setSkills(["Python", "C++", "Java", "SQL", "JavaScript", "React", "Node.js", "HTML", "CSS"]);
  }

  const experienceBlock = experience.map((item, i, row) => {
    if(i + 1 === row.length) {
      return (
        <><Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{item["company"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box></>
      )}
    else{
      return(
        <><Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{item["company"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box>
          <Divider variant="middle" /></>
      )
    }
  });

  const educationBlock = education.map((item, i, row) => {
    if(i + 1 === row.length) {
      return (
        <><Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["school"]}</Typography>
            <Typography variant="subtitle1">{item["degree"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box></>
      )}
    else{
      return(
        <><Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["school"]}</Typography>
            <Typography variant="subtitle1">{item["degree"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box>
          <Divider variant="middle" /></>
      )
    }
  });

  useEffect(() => {
    getFirstName();
    getLastName();
    getPronoun();
    getBiography();
    getEmail();
    getSkills();
    getDescription();
    getExperience();
    getEducation();
    }, []
    )

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
                      {firstName} {lastName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {(pronoun === "None") ? null : "(" + pronoun + ")"}
                    </Typography>
                    <Typography variant="subtitle1" className="profile-bio">{biography}</Typography>
                  </Box>
                </Box>
                <Box className="profile-summary">
                  <Box sx={{float:"right"}}>
                    <IconButton aria-label="edit summary" onClick={handleClickSummaryDialog}>
                      <EditIcon/>
                    </IconButton>
                    <Dialog open={openSummaryDialog} onClose={handleCloseSummaryDialog}>
                      <Box>
                        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                          <DialogTitle>Edit Summary</DialogTitle>
                          <IconButton aria-label="close summmary" onClick={handleCloseSummaryDialog}>
                            <CloseIcon/>
                          </IconButton>
                        </Box>
                        <Divider variant="middle"/>
                        <DialogContent>
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="fname"
                            label="First Name"
                            value={bufferFirstName}
                            onChange={(e) => setBufferFirstName(e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="lname"
                            label="Last Name"
                            value={bufferLastName}
                            onChange={(e) => setBufferLastName(e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="email"
                            label="Email Address"
                            type="email"
                            value={bufferEmail}
                            onChange={(e) => setBufferEmail(e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            id="Biography"
                            label="Biography"
                            type="Biography"
                            value={bufferBiography}
                            onChange={(e) => setBufferBiography(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={2}
                            variant="standard"
                          />
                          <Select 
                            sx={{ m: 1 }}
                            value={bufferPronoun}
                            id="pronoun-select"
                            onChange={(e) => setBufferPronoun(e.target.value)}
                            label="Pronouns"
                            size="small"
                          >
                            <MenuItem value="None">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"He/Him"}>He/Him</MenuItem>
                            <MenuItem value={"She/Her"}>She/Her</MenuItem>
                            <MenuItem value={"They/Them"}>They/Them</MenuItem>
                          </Select>
                        </DialogContent>
                        <DialogActions>
                          <Button variant="contained" onClick={handleSaveSummaryDialog}>Save</Button>
                        </DialogActions>
                      </Box>
                    </Dialog>
                  </Box>
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
                    {skills.map((item) => (
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
            <Box className="profile-description-title">
              <Typography variant="h5" component="div">Description</Typography>
              <IconButton aria-label="edit description" onClick={ handleClickDescriptionDialog }>
                <EditIcon/>
              </IconButton>
              <Dialog open={openDescriptionDialog} onClose={handleCloseDescriptionDialog} maxWidth='md' fullWidth>
                <Box>
                  <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>Edit Description</DialogTitle>
                    <IconButton aria-label="close description" onClick={handleCloseDescriptionDialog}>
                      <CloseIcon/>
                    </IconButton>
                  </Box>
                  <Divider variant="middle"/>
                  <DialogContent>
                    <TextField
                      id="Description"
                      label="Description"
                      value={bufferDescription}
                      onChange={(e) => setBufferDescription(e.target.value)}
                      fullWidth
                      multiline
                      maxRows={20}
                      variant="outlined"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" onClick={handleSaveDescriptionDialog}>Save</Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </Box>
            <Typography variant="body2" className="profile-description-text">
              {description}
            </Typography>
          </Card>

          <Card className="profile-jobs">
            <Box className="profile-jobs-title">
              <Typography variant="h5">
                Experience
              </Typography>
              <IconButton aria-label="edit experience" onClick={navigateToExperience}>
                <EditIcon/>
              </IconButton>
            </Box>
            
            <Box className="profile-jobs-text">
              {experienceBlock}
            </Box>
          </Card>

          <Card className="profile-jobs">
            <Box className="profile-jobs-title">
            <Typography variant="h5" component="div">
              Education
            </Typography>
            <IconButton aria-label="edit education" onClick={navigateToEducation}>
              <EditIcon/>
            </IconButton>
            </Box>
            <Box className="profile-jobs-text">
              {educationBlock}
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

        <Card className="profile-jobs" component="div">
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
      <body>
        <NavBar/>
        {isCandidate ? <CandidateProfile /> : <EmployerProfile />}
      </body>
      
    )
}

export default ProfilePage;
