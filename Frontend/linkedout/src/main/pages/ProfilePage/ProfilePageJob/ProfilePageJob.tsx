import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useApplicantProfile } from "../hooks";
import ArrowbackIcon from '@mui/icons-material/ArrowBack';
import { isUserLoggedIn } from "../../LoginPage/types";
import Cookies from "universal-cookie";
import { auth_token_cookie_name, create_experience, delete_applications, delete_experience, retrieve_session_user, update_experience } from "../../../../axiosconfig";
import { getCurrentDate } from "../../AddJobListing/types";

export const ProfilePageJob = () => {
    const { setId, setUserId, userId, getJobPostings, jobPostings, setJobPostings, getExperience, experience, navigateBackFromExperience, isCandidate, setIsCandidate } = useApplicantProfile();
    const [loaded, setLoaded] = React.useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [bufferId, setBufferId] = React.useState(0);
    const [bufferTitle, setBufferTitle] = React.useState("");
    const [bufferCompany, setBufferCompany] = React.useState("");
    const [bufferStartDate, setBufferStartDate] = React.useState("");
    const [bufferEndDate, setBufferEndDate] = React.useState("");
    const [bufferDescription, setBufferDescription] = React.useState("");
    const [currentExperience, setCurrentExperience] = React.useState(0);

    const handleOpenExperienceDialog = index => {
        
        setCurrentExperience(index);
        if(isCandidate){
            setBufferId(experience[index]["id"]);
            setBufferTitle(experience[index]["title"]);
            setBufferCompany(experience[index]["company"]);
            setBufferStartDate(experience[index]["start_date"]);
            setBufferEndDate(experience[index]["end_date"]);
            setBufferDescription(experience[index]["description"]);
        }
        else{
            setBufferTitle(jobPostings[index]["title"]);
            setBufferCompany(jobPostings[index]["company"]);
            setBufferStartDate(jobPostings[index]["start_date"]);
            setBufferEndDate(jobPostings[index]["end_date"]);
            setBufferDescription(jobPostings[index]["description"]);
        }
        setOpenDialog(true);
    };

    const handleCloseExperienceDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteExperienceDialog = () => {
        setOpenDialog(false);
        if(isCandidate){
            // setExperience(experience.slice(0, currentExperience).concat(experience.slice(currentExperience + 1, experience.length)));
            delete_experience(bufferId);
        }       
        else{
            setJobPostings(jobPostings.slice(0, currentExperience).concat(jobPostings.slice(currentExperience + 1, jobPostings.length)));
        }
        window.location.reload();

    };

    const handleSaveExperienceDialog = () => {
        setOpenDialog(false);
        // let e = jobPostings;

        // if(isCandidate){
        //     e = experience;
        // }
        // e[currentExperience]["title"] = bufferTitle;
        // e[currentExperience]["company"] = bufferCompany;
        // e[currentExperience]["start_date"] = bufferStartDate;
        // e[currentExperience]["end_date"] = bufferEndDate;
        // e[currentExperience]["description"] = bufferDescription;
        if(isCandidate){
            // setExperience(e)
            console.log(experience)
            update_experience(bufferId,{
                "title": bufferTitle,
                "company": bufferCompany,
                "start_date": bufferStartDate,
                "end_date": bufferEndDate,
                "description": bufferDescription,
            }
        );

        }
        else{
            // setJobPostings(e);
            delete_applications(jobPostings[currentExperience].id)
                .then(s => console.log(s))
                .catch(e => console.log(e))
        }
        window.location.reload();
    };

    const handleAddExperienceDialog = () => {
        setOpenAddDialog(false);
        if(isCandidate){
            // setExperience([...experience, {
            //     "title": bufferTitle,
            //     "company": bufferCompany,
            //     "start_date": bufferStartDate,
            //     "end_date": bufferEndDate,
            //     "description": bufferDescription
            // }]);
            create_experience({
                "title": bufferTitle,
                "company": bufferCompany,
                "start_date": bufferStartDate,
                "end_date": bufferEndDate,
                "description": bufferDescription,
                //TODO: Add location and skills in the frontend
                "location": "blank",
                "skills": "blank",
                "applicant": userId,
            });
        }
        else{}
        setJobPostings([...jobPostings, {
            "title": bufferTitle,
            "company": bufferCompany,
            "start_date": bufferStartDate,
            "end_date": bufferEndDate,
            "description": bufferDescription,

        }]);

        //add deletion of applications here
        window.location.reload();
    };

    const [errorTitle, setErrorTitle] = useState(true);
    const [errorCompany, setErrorCompany] = useState(true);
    const [errorDescription, setErrorDescription] = useState(true);
    const [errorExpiry, setErrorExpiry] = useState(false);

    const handleOpenAddExperienceDialog = () => {
        setBufferTitle("");
        setBufferCompany("");
        setBufferStartDate(getCurrentDate());
        setBufferEndDate(getCurrentDate());
        setBufferDescription("");
        setOpenAddDialog(true);
        setErrorTitle(true);
        setErrorCompany(true);
        setErrorDescription(true);
        setErrorExpiry(false);
    };

    const dialogProps = !isCandidate ? {
        error: errorExpiry,
        helperText: errorExpiry ? "Expiry Date cannot be before posting date" : ""
    } : {
        error: errorExpiry,
        helperText: !errorExpiry ? "End Date" : "End Date cannot be before posting date"
    }

    const addExperienceDialog = 
    <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <Box>
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <DialogTitle>{isCandidate ? "Add Experience" : "Add Job Posting"}</DialogTitle>
            <IconButton aria-label="close experience" onClick={() => setOpenAddDialog(false)}>
                <CloseIcon/>
            </IconButton>
        </Box>
        <Divider variant="middle"/>
        <DialogContent>
            <TextField
                sx={{ marginTop: 0.5 }}
                autoFocus
                id="title"
                label="Title"
                value={bufferTitle}
                onChange={(e) => {
                    setErrorTitle(e.target.value.toString().length === 0);
                    setBufferTitle(e.target.value)
                }}
                fullWidth
                variant="standard"
                helperText={errorTitle ? "Invalid Title" : ""}
                error={errorTitle}
            />
            <TextField
                sx={{ marginTop: "1em" }}
                autoFocus
                id="company"
                label="Company"
                value={bufferCompany}
                onChange={(e) => {
                    setErrorCompany(e.target.value.toString().length === 0);
                    setBufferCompany(e.target.value)
                }}
                fullWidth
                variant="standard"
                helperText={errorCompany ? "Invalid Company" : ""}
                error={errorCompany}
            />
            <TextField
                disabled={!isCandidate ? true : false}
                helperText={!isCandidate ? "Posting Date" : "Start Date"}
                sx={{ marginTop: 2.5 }}
                autoFocus
                id="start-date"
                type="date"
                value={bufferStartDate}
                onChange={(e) => {
                    if (isCandidate) {
                        const isExpiryDateValid = new Date(bufferEndDate).getTime() > new Date(e.target.value).getTime();
                        setErrorExpiry(!isExpiryDateValid)
                    }
                    setBufferStartDate(e.target.value)
                }}
                variant="standard"
            />
            <TextField
                sx={{ marginTop: 2.5, marginLeft: 1 }}
                autoFocus
                id="end-date"
                type="date"
                value={bufferEndDate}
                onChange={(e) => {
                    const isExpiryDateValid = new Date(e.target.value).getTime() > new Date(bufferStartDate).getTime();
                    setErrorExpiry(!isExpiryDateValid)
                    setBufferEndDate(e.target.value)
                }}
                variant="standard"
                {...dialogProps}
            />
            <TextField
                sx={{ marginTop: "1em" }}
                id="Description"
                label="Description"
                value={bufferDescription}
                onChange={(e) => {
                    setErrorDescription(e.target.value.toString().length === 0);
                    setBufferDescription(e.target.value)
                }}
                fullWidth
                multiline
                maxRows={2}
                variant="standard"
                helperText={errorDescription ? "Invalid Description" : ""}
                error={errorDescription}
            />
        </DialogContent>
        <Box sx={{right:0, justifyContent:"space-between"}}>
            <DialogActions onClick={handleAddExperienceDialog}>
                <Button variant="contained" disabled={errorExpiry || errorCompany || errorTitle || errorDescription}>Add</Button>
            </DialogActions>
        </Box>
        </Box>
    </Dialog>

    const [postingEditTitleError, setPostingEditTitleError] = useState(false);
    const [postingEditDescriptionError, setPostingEditDescriptionError] = useState(false);
    const [postingEditCompanyError, setPostingEditErrorCompany] = useState(false);
    const [postingEditExpiryError, setPostingEditErrorExpiry] = useState(false);
    const disableSaveBtn = !isCandidate ? (postingEditTitleError || postingEditDescriptionError) : (
        postingEditDescriptionError || postingEditTitleError || postingEditCompanyError || postingEditExpiryError
    )
    const experienceBlock = (isCandidate ? experience : jobPostings).map((item, i, row) => {
        const experienceBox = 
        <><Box className="profile-jobs-text-details" >
            <IconButton 
                aria-label="edit experience" 
                component="div" 
                onClick={ e => {
                    handleOpenExperienceDialog(i)
                    setPostingEditErrorExpiry(false)
                    setPostingEditErrorCompany(false)
                    setPostingEditDescriptionError(false);
                    setPostingEditTitleError(false);
                }} 
                sx={{float:"right"}}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={openDialog} onClose={handleCloseExperienceDialog}>
                <Box>
                <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>{isCandidate ? "Edit Experience" : "Edit Postings"} </DialogTitle>
                    <IconButton aria-label="close experience" onClick={handleCloseExperienceDialog}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Divider variant="middle"/>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: 0 }}
                        autoFocus
                        id="title"
                        label="Title"
                        value={bufferTitle}
                        onChange={(e) => {
                            setPostingEditTitleError(e.target.value.length === 0)
                            setBufferTitle(e.target.value)
                        }}
                        helperText={postingEditTitleError ? "Invalid Title" : ""}
                        error={postingEditTitleError}
                        fullWidth
                        variant="standard"
                    />
                    {isCandidate ? 
                    <>
                        <TextField
                            sx={{ marginTop: "1em" }}
                            autoFocus
                            id="company"
                            label="Company"
                            value={bufferCompany}
                            onChange={(e) => {
                                setPostingEditErrorCompany(e.target.value.toString().length === 0);
                                setBufferCompany(e.target.value)
                            }}
                            fullWidth
                            variant="standard"
                            helperText={postingEditCompanyError ? "Invalid Company" : ""}
                            error={postingEditCompanyError}
                        />
                        <TextField
                            helperText={postingEditExpiryError ? "Start date cannot be after end date" : "Start Date"}
                            sx={{ marginTop: 2.5 }}
                            autoFocus
                            id="start-date"
                            type="date"
                            value={bufferStartDate}
                            onChange={(e) => {
                                const isExpiryDateValid = new Date(bufferEndDate).getTime() > new Date(e.target.value).getTime();
                                setPostingEditErrorExpiry(!isExpiryDateValid)
                                setBufferStartDate(e.target.value)
                            }}
                            variant="standard"
                            error={postingEditExpiryError}
                        />
                        <TextField
                            sx={{ marginTop: 2.5, marginLeft: 1 }}
                            autoFocus
                            id="end-date"
                            type="date"
                            value={bufferEndDate}
                            onChange={(e) => {
                                const isExpiryDateValid = new Date(e.target.value).getTime() > new Date(bufferStartDate).getTime();
                                setPostingEditErrorExpiry(!isExpiryDateValid)
                                setBufferEndDate(e.target.value)
                            }}
                            variant="standard"
                            error={postingEditExpiryError}
                            helperText={postingEditExpiryError ? "End date cannot be before start date" : "End date"}
                        />
                    </>
                    : null}
                    <TextField
                        sx={{ marginTop: "2em" }}
                        id="Description"
                        label="Description"
                        value={bufferDescription}
                        onChange={(e) => {
                            setPostingEditDescriptionError(e.target.value.length === 0);
                            setBufferDescription(e.target.value)
                        }}
                        helperText={postingEditDescriptionError ? "Invalid Description" : ""}
                        error={postingEditDescriptionError}
                        fullWidth
                        multiline
                        maxRows={2}
                        variant="standard"
                    />
                </DialogContent>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleDeleteExperienceDialog}>Delete</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={() => handleSaveExperienceDialog()} 
                            variant="contained"
                            disabled={disableSaveBtn}
                        >Save</Button>
                    </DialogActions>
                </Box>
                </Box>
            </Dialog>
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{item["company"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{isCandidate ?(item["start_date"].split("-")[0] + "-" + item["end_date"].split("-")[0] ) : item["posting_date"]}</Typography>
            <Typography variant="body2">{item["description"]}</Typography>
        </Box></>;
        if(i + 1 === row.length) {
          return (
            (experienceBox)
          )}
        else{
          return(
            <div>
                {experienceBox}
                <><Divider variant="middle" /></>
            </div>
          )
        }
      });

    useEffect(() => {
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
      
                getExperience(s.data);
                
              }
              else{
                setUserId(s.data.recruiter_id);
                getJobPostings(s.data)
              }
            })
          }
        
    }, [loaded, setIsCandidate, setUserId, setId, getExperience, getJobPostings]);

    return (
        <body>
            <NavBar />
            <div className="profile-body">
                <Box className="profile-cards">
                    <Card className="profile-jobs">
                        <Box className="profile-jobs-title">
                            <Box sx={{ display: "flex" }}>
                                <IconButton aria-label="edit experience" onClick={navigateBackFromExperience} href="/profile">
                                    <ArrowbackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{marginTop:"0.25em"}}>
                                    {isCandidate ? "Experience" : "Our Job Postings"}
                                </Typography>
                            </Box>
                            <IconButton aria-label="edit experience" onClick={handleOpenAddExperienceDialog}>
                                <AddIcon />
                            </IconButton>
                            {addExperienceDialog}
                        </Box>

                        <Box className="profile-jobs-text">
                            {experienceBlock}
                        </Box>
                    </Card>

                </Box>
            </div>
        </body>
    );
};

export default ProfilePageJob;
function navigatetBackToHome() {
    throw new Error("Function not implemented.");
}

