import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, NativeSelect, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useApplicantProfile } from "../hooks";
import ArrowbackIcon from '@mui/icons-material/ArrowBack';
import { isUserLoggedIn } from "../../LoginPage/types";
import Cookies from "universal-cookie";
import { auth_token_cookie_name, create_experience, delete_applications, delete_experience, delete_job, retrieve_session_user, update_experience, update_jobs, upload_job } from "../../../../axiosconfig";
import { getCurrentDate } from "../../AddJobListing/types";

export const ProfilePageJob = () => {
    const { setId, setUserId, userId, getJobPostings, jobPostings, getExperience, experience, navigateBackFromExperience, isCandidate, setIsCandidate } = useApplicantProfile();
    const [loaded, setLoaded] = React.useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [company, setCompany] = React.useState("");
    const [bufferId, setBufferId] = React.useState(0);
    const [bufferTitle, setBufferTitle] = React.useState("");
    const [bufferCompany, setBufferCompany] = React.useState("");
    const [bufferStartDate, setBufferStartDate] = React.useState("");
    const [bufferEndDate, setBufferEndDate] = React.useState("");
    const [bufferLocation, setBufferLocation] = React.useState("");
    const [bufferType, setBufferType] = React.useState("");
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
            setBufferId(jobPostings[index]["id"]);
            setBufferTitle(jobPostings[index]["title"]);
            setBufferCompany(company);
            setBufferStartDate(jobPostings[index]["start_date"]);
            setBufferEndDate(jobPostings[index]["end_date"]);
            setBufferDescription(jobPostings[index]["description"]);
            setBufferLocation(jobPostings[index]["city"]);
            setBufferType(jobPostings[index]["job_type"]);
        }
        setOpenDialog(true);
    };

    const handleCloseExperienceDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteExperienceDialog = () => {
        setOpenDialog(false);
        if(isCandidate){
            delete_experience(bufferId);
        }       
        else{
            delete_job(bufferId)
        }
        window.location.reload();

    };

    const handleSaveExperienceDialog = () => {
        setOpenDialog(false);
        if(isCandidate){
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
            update_jobs(jobPostings[currentExperience].id, {
                "title": bufferTitle,
                "company": bufferCompany,
                "start_date": bufferStartDate,
                "end_date": bufferEndDate,
                "description": bufferDescription,
                "location": bufferLocation,
                "skills": "blank",
                "job_type": bufferType,
                })
            delete_applications(jobPostings[currentExperience].id)
                .then(s => console.log(s))
                .catch(e => console.log(e))
        }
        window.location.reload();
    };

    const handleAddExperienceDialog = () => {
        setOpenAddDialog(false);
        if(isCandidate){
            create_experience({
                "title": bufferTitle,
                "company": bufferCompany,
                "start_date": bufferStartDate,
                "end_date": bufferEndDate,
                "description": bufferDescription,
                "location": "blank",
                "skills": "blank",
                "applicant": userId,
            });
        }
        else{
            upload_job(bufferTitle, userId, bufferCompany + ".com", bufferStartDate, bufferEndDate, bufferLocation, bufferType, bufferDescription).then().catch();
        }
        window.location.reload();
    };

    const [errorTitle, setErrorTitle] = useState(true);
    const [errorCompany, setErrorCompany] = useState(true);
    const [errorDescription, setErrorDescription] = useState(true);
    const [errorLocation, setErrorLocation] = useState(true);
    const [errorExpiry, setErrorExpiry] = useState(false);

    const handleOpenAddExperienceDialog = () => {
        setBufferTitle("");
        setBufferCompany(company);
        setBufferStartDate(getCurrentDate());
        setBufferEndDate(getCurrentDate());
        setBufferDescription("");
        setBufferLocation("");
        setOpenAddDialog(true);
        setErrorTitle(false);
        setErrorCompany(false);
        setErrorDescription(false);
        setErrorExpiry(false);
        setErrorLocation(false);
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
                disabled={!isCandidate ? true : false}
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
                sx={{ marginTop: 2.5}}
                autoFocus
                id="location"
                fullWidth
                label="Location"
                value={bufferLocation}
                onChange={(e) => {
                    setErrorLocation(e.target.value.toString().length === 0);
                    setBufferLocation(e.target.value)
                }}
                variant="standard"
                error={errorLocation}
            />
            <NativeSelect
                sx={{ marginTop: 2.5 }}
                value={bufferType}
                id="type-select"
                onChange={(e) => {
                    setBufferType(e.target.value)
                }}
                defaultValue={"Full-Time"}
                size="small"
            >
            <option value={"Full-Time"}>Full-Time</option>
            <option value={"Internship"}>Internship</option>
            <option value={"Seasonal"}>Seasonal</option>
            <option value={"Part-Time"}>Part-Time</option>
            </NativeSelect>
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
            <DialogActions>
                <Button variant="contained" onClick={handleAddExperienceDialog} disabled={errorExpiry || errorCompany || errorTitle || errorDescription || errorLocation}>Add</Button>
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
            <Typography variant="subtitle1">{isCandidate ? item["company"] : company}</Typography>
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
                setCompany(s.data.company)
                
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

