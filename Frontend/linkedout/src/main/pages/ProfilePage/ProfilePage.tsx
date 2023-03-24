import React, { useEffect, useState } from "react";
import { IconButton, Card, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText, Divider, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, Select, MenuItem } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import "./ProfilePage.css";
import NavBar from '../../../components/NavBar/NavBar';
import { useApplicantProfile } from './hooks';
import { auth_token_cookie_name, get_user_type } from "../../../axiosconfig";
import Cookies from "universal-cookie";

export const CandidateProfile = () => {
  const { getJobPostings, jobPostings, getExperience, recentExperience, experience, navigateToExperience, navigateToEducation, getEducation, education, isCandidate } = useApplicantProfile();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("None");
  const [biography, setBiography] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [recentEducation, setRecentEducation] = useState<string>("");

  const [companyName, setCompanyName] = useState("");
  const [establishedDate, setEstablishedDate] = useState("");
  const [awards, setAwards] = useState([]);
  const [offices, setOffices] = useState([]);
  const [aboutUs, setAboutUs] = useState("");

  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);

  const [bufferFirstName, setBufferFirstName] = useState("");
  const [bufferLastName, setBufferLastName] = useState("");
  const [bufferPronoun, setBufferPronoun] = useState("");
  const [bufferBiography, setBufferBiography] = useState("");
  const [bufferEmail, setBufferEmail] = useState("");

  const [bufferCompanyName, setBufferCompanyName] = useState("");
  const [bufferEstablishedDate, setBufferEstablishedDate] = useState("");
  const [bufferOffices, setBufferOffices] = useState([]);
  const [bufferAboutUs, setBufferAboutUs] = useState("");
  const [bufferAwards, setBufferAwards] = useState([]);


  const [bufferDescription, setBufferDescription] = useState("");

  const handleClickSummaryDialog = () => {
    if(isCandidate){
    setBufferFirstName(firstName);
    setBufferLastName(lastName);
    setBufferPronoun(pronoun);
    setBufferBiography(biography);
    setBufferEmail(email);
    }
    else{
      setBufferCompanyName(companyName);
      setBufferEstablishedDate(establishedDate);
      setBufferOffices(offices);
      setBufferAboutUs(aboutUs);
      setBufferAwards(awards);
    }
    setOpenSummaryDialog(true);
  };

  const handleCloseSummaryDialog = () => {
    setOpenSummaryDialog(false);
  };

  const handleSaveSummaryDialog = () => {
    if(isCandidate){
      setFirstName(bufferFirstName);
      setLastName(bufferLastName);
      setPronoun(bufferPronoun);
      setBiography(bufferBiography);
      setEmail(bufferEmail);
      
    }
    else{
      setCompanyName(bufferCompanyName);
      setEstablishedDate(bufferEstablishedDate);
      setOffices(bufferOffices);
      setAboutUs(bufferAboutUs);
      setAwards(bufferAwards);
    }
    setOpenSummaryDialog(false);
  };

  const handleClickDescriptionDialog = () => {
    if(isCandidate) {
      setBufferDescription(description);
    }
    else{
      setBufferAboutUs(aboutUs);
    }
    setOpenDescriptionDialog(true);
  }

  const handleCloseDescriptionDialog = () => {
    setOpenDescriptionDialog(false);
  };
  const handleSaveDescriptionDialog = () => {
    if(isCandidate)
      setDescription(bufferDescription);
    else
      setAboutUs(bufferAboutUs);
        
    setOpenDescriptionDialog(false);
  };

  const getApplicant = () => {
    const candidate = {
      "first_name" : "Jane",
      "last_name" : "Doe",
      "pronoun" : "She/Her",
      "biography" : "Data Scientist @ Google",
      "email" : "Jane.Doe@gmail.com",
      "description": "Ever since I was a little girl, I wanted to code. My father and mother were both programmers working for Google when I was growing up.",
      "skills" : ["Python", "C++", "Java", "SQL", "JavaScript", "React", "Node.js", "HTML", "CSS"]
    }
    setFirstName(candidate["first_name"]);
    setLastName(candidate["last_name"]);
    setPronoun(candidate["pronoun"]);
    setBiography(candidate["biography"]);
    setEmail(candidate["email"]);
    setDescription(candidate["description"]);
    setSkills(candidate["skills"]);
  }

  const getRecruiter = () => {
    const recruiter = {
      "company_name" : "Google",
      "established_date" : "2023",
      "awards" : ["Best Company in RAM usage",
                  "Rated #1 in AI until this year"],
      "offices" : ["Mountain View, CA", "New York, NY", "London, UK"],
      "about_us" : "We are a company that is dedicated to making the world a better place.",
    }
    setCompanyName(recruiter["company_name"]);
    setEstablishedDate(recruiter["established_date"]);
    setAwards(recruiter["awards"]);
    setOffices(recruiter["offices"]);
    setAboutUs(recruiter["about_us"]);
  }

  const experienceBlock = (isCandidate ? experience : jobPostings).map((item, i, row) => {
    const information = 
          <Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{item["company"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{isCandidate ? item["start_date"].split("-")[0] + "-" + item["end_date"].split("-")[0] : item["posting_date"]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box>

    if(i + 1 === row.length) {
      return (
        <>{information}</>
      )}
    else{
      return(
        <>{information}
          <Divider variant="middle" /></>
      )
    }
  });

  const educationBlock = education.map((item, i, row) => {
    const information =
          <Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["school"]}</Typography>
            <Typography variant="subtitle1">{item["degree"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
          </Box>
    if(i + 1 === row.length) {
      return (
        <>{information}</>
      )}
    else{
      return(
        <>
          {information}
          <Divider variant="middle" />
        </>
      )
    }
  });

  useEffect(() => {

    if(isCandidate){
      getApplicant();
      getExperience();
      getEducation();
    }
    else{
      getRecruiter()
      getJobPostings()
    }
  }, [])

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
                      {isCandidate ? firstName + ' ' + lastName : companyName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {isCandidate ? (pronoun === "None") ? null : "(" + pronoun + ")" : "Est. " + establishedDate}
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
                        {isCandidate ? 
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
                        :
                        <DialogContent>
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="comaany-name"
                            label="Company Name"
                            value={bufferCompanyName}
                            onChange={(e) => setBufferCompanyName(e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="established-date"
                            label="Established Date"
                            value={bufferEstablishedDate}
                            onChange={(e) => setBufferEstablishedDate(e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="award-one"
                            label="Award One"
                            value={bufferAwards[0]}
                            onChange={(e) => setBufferAwards([e.target.value, bufferAwards[1]])}
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            sx={{ marginTop: 0.5 }}
                            autoFocus
                            id="award-two"
                            label="Award Two"
                            value={bufferAwards[1]}
                            onChange={(e) => setBufferAwards([bufferAwards[0], e.target.value])}
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>}
                        <DialogActions>
                          <Button variant="contained" onClick={handleSaveSummaryDialog}>Save</Button>
                        </DialogActions>
                      </Box>
                    </Dialog>
                  </Box>
                  <Typography variant="subtitle1" component="div">
                    {isCandidate ? recentEducation : awards[0]}
                  </Typography>
                  <Divider/>
                  <Typography variant="subtitle1" component="div">
                    {isCandidate ? recentExperience : awards[1]}
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
                    <ListSubheader>{isCandidate ? 'Skills' : 'Offices'}</ListSubheader>
                    {(isCandidate ? skills : offices).map((item) => (
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
              <Typography variant="h5" component="div">{isCandidate ? "Description" : "About Us"}</Typography>
              <IconButton aria-label="edit description" onClick={ handleClickDescriptionDialog }>
                <EditIcon/>
              </IconButton>
              <Dialog open={openDescriptionDialog} onClose={handleCloseDescriptionDialog} maxWidth='md' fullWidth>
                <Box>
                  <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>{isCandidate ? "Edit Description" : "Edit About Us"}</DialogTitle>
                    <IconButton aria-label="close description" onClick={handleCloseDescriptionDialog}>
                      <CloseIcon/>
                    </IconButton>
                  </Box>
                  <Divider variant="middle"/>
                  <DialogContent>
                    {isCandidate ? 
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
                    :
                      <TextField
                        id="About Us"
                        label="About Us"
                        value={bufferAboutUs}
                        onChange={(e) => setBufferAboutUs(e.target.value)}
                        fullWidth
                        multiline
                        maxRows={20}
                        variant="outlined"
                      />
                    }
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" onClick={handleSaveDescriptionDialog}>Save</Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </Box>
            <Typography variant="body2" className="profile-description-text">
              {isCandidate ? description : aboutUs}
            </Typography>
          </Card>
          <a id="jobs">
          <Card className="profile-jobs">
              <Box className="profile-jobs-title">
                <Typography variant="h5">
                  {isCandidate ? "Experience" : "Our Jobs Postings"}
                </Typography>
                <IconButton aria-label="edit experience" onClick={navigateToExperience}>
                  <EditIcon/>
                </IconButton>
              </Box>
              
              <Box className="profile-jobs-text">
                {experienceBlock}
              </Box>
          </Card>
          </a>
          {isCandidate ? 
          <a id="educations">
          <Card className="profile-jobs">
            <Box className="profile-jobs-title">
            <Typography variant="h5" component="div">
              Education
            </Typography>
            <IconButton aria-label="edit education" onClick={(navigateToEducation)}>
              <EditIcon/>
            </IconButton>
            </Box>
            <Box className="profile-jobs-text">
              {educationBlock}
            </Box>
          </Card>
          </a>
      : null}
       </Box>
      </div>
    );
};

const ProfilePage = () => {
  const { setIsCandidate } = useApplicantProfile();
  const authToken = new Cookies().get(auth_token_cookie_name);

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const getUserType = async () => {
      const type = await get_user_type(authToken);
      type ==='candidate' ? setIsCandidate(true) : setIsCandidate(false);
      setUserType(type);
    };

    getUserType();
  }, [authToken]);

  return (
    <body>
      <NavBar />
      <CandidateProfile />
    </body>
  );
};

export default ProfilePage;
