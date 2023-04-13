import React, { useEffect, useState } from "react";
import { IconButton, Card, CardContent, Typography, CardMedia, Box, List, ListSubheader, ListItem, ListItemText, Divider, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, Select, MenuItem, OutlinedInput, Chip, SelectChangeEvent } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from '../../../components/NavBar/NavBar';
import { useApplicantProfile } from './hooks';
import { auth_token_cookie_name, retrieve_session_user, retrieve_visiting_user, update_applicant_description, update_applicant_summary, update_recruiter_about, update_recruiter_summary, update_user_summary } from "../../../axiosconfig";
import Cookies from "universal-cookie";
import "./ProfilePage.css";
import { isUserLoggedIn } from "../LoginPage/types";
import Footer from "../../../components/Footer/Footer";

export const ProfilePage = () => {
  const { userIdVisit, userId, setUserId, Id, setId, navigatetBackToHome, setIsCandidate, getJobPostings, jobPostings, getExperience, recentExperience, recentEducation, experience, navigateToExperience, navigateToEducation, getEducation, education, isCandidate } = useApplicantProfile();
  const [loaded, setLoaded] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("None");
  const [biography, setBiography] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);

  const [companyName, setCompanyName] = useState("");
  const [establishedDate, setEstablishedDate] = useState("");
  const [awards, setAwards] = useState([]);
  const [offices, setOffices] = useState([]);
  const [aboutUs, setAboutUs] = useState("");

  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);

  const [bufferFirstName, setBufferFirstName] = useState("");
  const [bufferLastName, setBufferLastName] = useState("");
  const [bufferPronoun, setBufferPronoun] = useState("");
  const [bufferBiography, setBufferBiography] = useState("");
  const [bufferEmail, setBufferEmail] = useState("");

  const [bufferSkills, setBufferSkills] = useState([]);

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
      update_user_summary(Id, {"username": bufferEmail,
                                "first_name": bufferFirstName,
                                "last_name": bufferLastName,
                                "email": bufferEmail,
                              }
);
      update_applicant_summary(userId, {"username": bufferEmail,
                                        "reffered_pronouns": bufferPronoun,
                                        "interests": bufferBiography,
                                      }
      );
    }
    else{
      setCompanyName(bufferCompanyName);
      setEstablishedDate(bufferEstablishedDate);
      setOffices(bufferOffices);
      setAboutUs(bufferAboutUs);
      setAwards(bufferAwards);
      update_recruiter_summary(userId, {"company": bufferCompanyName,
                                        "established": bufferEstablishedDate,
                                        // "offices": bufferOffices,
                                        "award_one": bufferAwards[0],
                                        "award_two": bufferAwards[1],
                                      }
      );
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
    if (!bufferDescription){
      setBufferDescription("");
    }
    if(isCandidate)
    {
      setDescription(bufferDescription);
      update_applicant_description(userId, bufferDescription);
    }
    else
    {
      setAboutUs(bufferAboutUs);
      update_recruiter_about(userId, bufferAboutUs);
    } 
    setOpenDescriptionDialog(false);
  };

  const handleClickSkillsDialog = () => {
    setBufferSkills(skills);
    setOpenSkillsDialog(true);
  }

  const handleCloseSkillsDialog = () => {
    setOpenSkillsDialog(false);
  };

  const handleSaveSkillsDialog = () => {
    setSkills(bufferSkills);
    setOpenSkillsDialog(false);
  };

  const handleSkillsChange = (event: SelectChangeEvent<typeof skills>) => {
    const {
      target: { value },
    } = event;
    setBufferSkills(
      typeof value === 'string' ? value.split(',') : value,
    )
  };

  const handleOfficesChange = (event: SelectChangeEvent<typeof offices>) => {
    const {
      target: { value },
    } = event;
    setBufferOffices(
      typeof value === 'string' ? value.split(',') : value,
    )
  };

  const getApplicant = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setPronoun(data.reffered_pronouns);
    setBiography(data.interests);
    setEmail(data.email);
    setDescription(data.description);
    setSkills(["JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Git",]);
  }

  const programmingSkills = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Git",
    "Agile development",
    "Responsive web design",
    "Debugging",
    "Testing",
    "Object-oriented programming",
    "Functional programming",
    "API design",
    "Security best practices",
    "Performance optimization",
    "Deployment",
    "Continuous integration/continuous deployment (CI/CD)",
    ];

  const getRecruiter = () => {
    
    const recruiter = {
      "company_name" : "Amazon",
      "established_date" : "2023",
      "awards" : ["Best Company in RAM usage",
                  "Rated #1 in AI until this year"],
      "offices" : ["Mountain View, CA", "New York, NY", "London, UK", "Tokyo, Japan", "Beijing, China", "Sydney, Australia", "Bangalore, India", ],
      "about_us" : "We are a company that is dedicated to making the world a better place.",
    }
    // setCompanyName(recruiter["company_name"]);
    // setEstablishedDate(recruiter["established_date"]);
    // setAwards(recruiter["awards"]);
    setOffices(recruiter["offices"]);
    // setAboutUs(recruiter["about_us"]);
  }

  const experienceBlock = (isCandidate ? experience : jobPostings).map((item, i, row) => {
    const information = 
          <Box className="profile-jobs-text-details">
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{isCandidate ? item["company"] : companyName}</Typography>
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
            <Typography variant="subtitle1">{item["degree"] + " of " + item["major"]}</Typography>
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
    if (userIdVisit === undefined){
      if(!isUserLoggedIn()){
        navigatetBackToHome();
      }
      else if(!loaded){
        setLoaded(true)
        const token = new Cookies().get(auth_token_cookie_name);
        retrieve_session_user(token).then((s) => {
          setIsCandidate(s.data.isApplicant);
          console.log(s.data)
          if(s.data.isApplicant){
            setUserId(s.data.applicant_id);
            setId(s.data.user_id);

            getApplicant(s.data);
            getExperience(s.data);
            getEducation(s.data);
            
          }
          else{
            setUserId(s.data.recruiter_id);
            setCompanyName(s.data.company);
            setAwards([s.data.award_one, s.data.award_two]);
            setEstablishedDate(s.data.established);
            setAboutUs(s.data.about);
            console.log(s.data)

            getRecruiter()
            getJobPostings(s.data)
          }
        })
      }
    }
    else{
      if(!loaded){
        setLoaded(true)
        retrieve_visiting_user(Number(userIdVisit)).then((s) => {
          setIsCandidate(s.data.isApplicant);
          console.log(s.data)
          if(s.data.isApplicant){
            setUserId(s.data.applicant_id);
            setId(s.data.user_id);

            getApplicant(s.data);
            getExperience(s.data);
            getEducation(s.data);
            
          }
          else{
            setUserId(s.data.recruiter_id);
            setCompanyName(s.data.company);
            setAwards([s.data.award_one, s.data.award_two]);
            setEstablishedDate(s.data.established);
            setAboutUs(s.data.about);
            console.log(s.data)

            getRecruiter()
            getJobPostings(s.data)
          }
        }).catch((e) => {
          console.log(e)
          navigatetBackToHome();
        })
      }
    }
  }, [loaded, getEducation, getExperience, getJobPostings, navigatetBackToHome, setIsCandidate, setId, setUserId, userIdVisit])

  return (
    <><NavBar/>
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
                  {userIdVisit === undefined ?
                  <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadOutlinedIcon />
                  </IconButton>
                  : null}
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
                      {isCandidate ? (pronoun === "None") ? null : "(" + pronoun + ")" : establishedDate === undefined || establishedDate===null ? "" : "Est. " + establishedDate}
                    </Typography>
                    <Typography variant="subtitle1" className="profile-bio">{biography}</Typography>
                  </Box>
                </Box>
                <Box className="profile-summary">
                  <Box sx={{float:"right"}}>
                    {userIdVisit === undefined ? 
                    <IconButton aria-label="edit summary" onClick={handleClickSummaryDialog}>
                      <EditIcon/>
                    </IconButton>
                    : null}
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
                  
                  <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <ListSubheader>{isCandidate ? 'Skills' : 'Offices'}</ListSubheader>
                    {userIdVisit === undefined ? 
                    <IconButton aria-label="edit skills" onClick={handleClickSkillsDialog}>
                      <EditIcon/>
                    </IconButton>
                    :null}         
                  </Box>
                    {(isCandidate ? skills : offices).map((item) => (
                      <ListItem key={`item-"PLang"-${item}`}>
                        <ListItemText primary={`${item}`} />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              </List>
              <Dialog open={openSkillsDialog} onClose={handleCloseSkillsDialog}>
                <Box>
                  <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>{isCandidate ? "Edit Skills" : "Edit Offices"}</DialogTitle>
                    <IconButton aria-label="close skills" onClick={handleCloseSkillsDialog}>
                      <CloseIcon/>
                    </IconButton>
                  </Box>
                  <Divider variant="middle"/>
                  {isCandidate ? 
                  <DialogContent>
                      <Select 
                        sx={{ m: 1 }}
                        multiple
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        value={bufferSkills}
                        id="skills-select"
                        onChange={handleSkillsChange}
                        label="Pronouns"
                        size="small"
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                      {
                      programmingSkills.map((skill) => (
                        <MenuItem
                          key={skill}
                          value={skill}
                        >
                          {skill}
                        </MenuItem>
                      ))}
                      </Select>
                  </DialogContent>
                  :
                  <DialogContent>
                    <Select 
                      sx={{ m: 1 }}
                      value={bufferOffices}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      id="pronoun-select"
                      onChange={handleOfficesChange}
                      label="Offices"
                      size="small"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="None">
                      </MenuItem>
                      {
                      offices.map((office) => (
                        <MenuItem
                          key={office}
                          value={office}
                        >
                          {office}
                        </MenuItem>
                      ))}
                    </Select>
                  </DialogContent>}
                  <DialogActions>
                    <Button variant="contained" onClick={handleSaveSkillsDialog}>Save</Button>
                  </DialogActions>
                </Box>
              </Dialog>
              {/* <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select> */}
            </Card>
          </Box>

          <Card className="profile-description">
            <Box className="profile-description-title">
              <Typography variant="h5" component="div">{isCandidate ? "Description" : "About Us"}</Typography>
              {userIdVisit === undefined ?
              <IconButton aria-label="edit description" onClick={ handleClickDescriptionDialog }>
                <EditIcon/>
              </IconButton>
              :null}
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
            <Typography variant="body2" className="profile-description-text" sx={{paddingLeft:"2em", paddingRight:"2em", paddingTop:"1em", paddingBottom:"1em"}}>
              {isCandidate ? description : aboutUs}
            </Typography>
          </Card>
          <Card className="profile-jobs">
              <Box className="profile-jobs-title">
                <Typography variant="h5">
                  {isCandidate ? "Experience" : "Our Jobs Postings"}
                </Typography>
                {userIdVisit === undefined ?
                <IconButton aria-label="edit experience" onClick={navigateToExperience}>
                  <EditIcon/>
                </IconButton>
                :null}
              </Box>
              
              <Box className="profile-jobs-text">
                {experienceBlock}
              </Box>
          </Card>
          {isCandidate ? 
          <Card className="profile-jobs" sx={{marginTop:"0.25vw", marginBottom:"0.25vw"}}>
            <Box className="profile-jobs-title">
            <Typography variant="h5" component="div">
              Education
            </Typography>
            {userIdVisit === undefined ?
            <IconButton aria-label="edit education" onClick={(navigateToEducation)}>
              <EditIcon/>
            </IconButton>
            :null}
            </Box>
            <Box className="profile-jobs-text">
              {educationBlock}
            </Box>
          </Card>
      : null}
       </Box>
      </div>
      <Footer/>
      </>
    );
};
export default ProfilePage;
