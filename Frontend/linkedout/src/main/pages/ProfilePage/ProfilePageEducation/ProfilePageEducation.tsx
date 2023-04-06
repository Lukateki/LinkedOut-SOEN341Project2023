import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApplicantProfile } from "../hooks";
import AddIcon from '@mui/icons-material/Add';
import { isUserLoggedIn } from "../../LoginPage/types";
import Cookies from "universal-cookie";
import { auth_token_cookie_name, create_education, delete_education, retrieve_session_user, update_education } from "../../../../axiosconfig";


export const ProfilePageEducation = () => {
    const { navigateBackFromEducation, setEducation, education, getEducation, setIsCandidate, setUserId, userId, setId } = useApplicantProfile();
    const [loaded, setLoaded] = React.useState(false);

    const [bufferId, setBufferId] = React.useState(0);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [bufferDegree, setBufferDegree] = React.useState("");
    const [bufferSchool, setBufferSchool] = React.useState("");
    const [bufferStartDate, setBufferStartDate] = React.useState("");
    const [bufferEndDate, setBufferEndDate] = React.useState("");
    const [bufferDescription, setBufferDescription] = React.useState("");
    const [currentEducation, setCurrentEducation] = React.useState(0);

    const handleOpenExperienceDialog = index => {
        setCurrentEducation(index);
        setBufferId(education[index]["id"]);
        setBufferSchool(education[index]["school"]);
        setBufferDegree(education[index]["degree"] + " of " + education[index]["major"]);
        setBufferStartDate(education[index]["start_date"]);
        setBufferEndDate(education[index]["end_date"]);
        setBufferDescription(education[index]["description"]);
        
        setOpenDialog(true);
    };

    const handleCloseExperienceDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteExperienceDialog = () => {
        setOpenDialog(false);
        delete_education(bufferId);
        setEducation(education.slice(0, currentEducation).concat(education.slice(currentEducation + 1, education.length)));
    };

    const handleSaveExperienceDialog = () => {
        setOpenDialog(false);
        // let e = education;
        // e[currentEducation]["school"] = bufferSchool;
        // e[currentEducation]["degree"] = bufferDegree;
        // e[currentEducation]["start_date"] = bufferStartDate;
        // e[currentEducation]["end_date"] = bufferEndDate;
        // e[currentEducation]["description"] = bufferDescription;
        // setEducation(e);
        update_education(bufferId, {
            "school": bufferSchool,
            "degree": bufferDegree.split(" of ")[0],
            "major": bufferDegree.split(" of ")[1],
            "start_date": bufferStartDate,
            "end_date": bufferEndDate,
            "description": bufferDescription,
            
        });

        window.location.reload();
    };
    const handleAddExperienceDialog = () => {
        setOpenAddDialog(false);
        // setEducation([...education, {
        //     "school": bufferSchool,
        //     "degree": bufferDegree,
        //     "start_date": bufferStartDate,
        //     "end_date": bufferEndDate,
        //     "description": bufferDescription
        // }]);
        create_education({
            "school": bufferSchool,
            "degree": bufferDegree.split(" of ")[0],
            "major": bufferDegree.split(" of ")[1],
            "start_date": bufferStartDate,
            "end_date": bufferEndDate,
            "description": bufferDescription,
            "applicant": userId,
            "skills": "python",
        });
        window.location.reload();
    };

    const handleOpenAddExperienceDialog = () => {
        setBufferSchool("");
        setBufferDegree("");
        setBufferStartDate("");
        setBufferEndDate("");
        setBufferDescription("");
        setOpenAddDialog(true);
    };
    
    const addEducationDialog = 
    <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <Box>
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <DialogTitle>Add Experience</DialogTitle>
            <IconButton aria-label="close experience" onClick={() => setOpenAddDialog(false)}>
                <CloseIcon/>
            </IconButton>
        </Box>
        <Divider variant="middle"/>
        <DialogContent>
            <TextField
            sx={{ marginTop: 0.5 }}
            autoFocus
            id="school"
            label="School"
            value={bufferSchool}
            onChange={(e) => setBufferSchool(e.target.value)}
            fullWidth
            variant="standard"
            />
            <TextField
            sx={{ marginTop: 0.5 }}
            autoFocus
            id="degree"
            label="Degree"
            value={bufferDegree}
            onChange={(e) => setBufferDegree(e.target.value)}
            fullWidth
            variant="standard"
            />
            <TextField
            sx={{ marginTop: 0.5 }}
            autoFocus
            id="start-date"
            label="Start Date"
            value={bufferStartDate}
            onChange={(e) => setBufferStartDate(e.target.value)}
            variant="standard"
            />
            <TextField
            sx={{ marginTop: 0.5 }}
            autoFocus
            id="end-date"
            label="End Date"
            value={bufferEndDate}
            onChange={(e) => setBufferEndDate(e.target.value)}
            variant="standard"
            />
            <TextField
            sx={{ marginTop: 0.5 }}
            id="Description"
            label="Description"
            value={bufferDescription}
            onChange={(e) => setBufferDescription(e.target.value)}
            fullWidth
            multiline
            maxRows={2}
            variant="standard"
            />
        </DialogContent>
        <Box sx={{right:0, justifyContent:"space-between"}}>
            <DialogActions onClick={handleAddExperienceDialog}>
                <Button variant="contained">Add</Button>
            </DialogActions>
        </Box>
        </Box>
    </Dialog>

    const educationBlock = education.map((item, i, row) => {
        const experienceBox = 
        <><Box className="profile-jobs-text-details" >
            <IconButton aria-label="edit education" component="div" onClick={ e => handleOpenExperienceDialog(i)} sx={{float:"right"}}>
                <EditIcon />
            </IconButton>
            <Dialog open={openDialog} onClose={handleCloseExperienceDialog}>
                <Box>
                <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>Edit Education</DialogTitle>
                    <IconButton aria-label="close experience" onClick={handleCloseExperienceDialog}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Divider variant="middle"/>
                <DialogContent>
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    autoFocus
                    id="school"
                    label="School"
                    value={bufferSchool}
                    onChange={(e) => setBufferSchool(e.target.value)}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    autoFocus
                    id="degree"
                    label="Degree"
                    value={bufferDegree}
                    onChange={(e) => setBufferDegree(e.target.value)}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    autoFocus
                    id="start-date"
                    label="Start Date"
                    value={bufferStartDate}
                    onChange={(e) => setBufferStartDate(e.target.value)}
                    variant="standard"
                    />
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    autoFocus
                    id="end-date"
                    label="End Date"
                    value={bufferEndDate}
                    onChange={(e) => setBufferEndDate(e.target.value)}
                    variant="standard"
                    />
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    id="Description"
                    label="Description"
                    value={bufferDescription}
                    onChange={(e) => setBufferDescription(e.target.value)}
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
                    <DialogActions onClick={handleSaveExperienceDialog}>
                        <Button variant="contained">Save</Button>
                    </DialogActions>
                </Box>
                </Box>
            </Dialog>
            <Typography variant="h6">{item["school"]}</Typography>
            <Typography variant="subtitle1">{item["degree"] + " of " + item["major"]}</Typography>
            <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
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
              getEducation(s.data);
              
            }
          })
        }
      }, [loaded, getEducation, setIsCandidate, setId, setUserId])
    return (
        <body>
            <NavBar />
            <div className="profile-body">
                <Box className="profile-cards">
                    <Card className="profile-jobs">
                        <Box className="profile-jobs-title">
                            <Box sx={{ display: "flex" }}>
                                <IconButton aria-label="edit experience" onClick={navigateBackFromEducation} href="/profile">
                                    <ArrowBackIcon/>
                                </IconButton>
                                <Typography variant="h5" sx={{marginTop:"0.25em"}}>
                                    Education
                                </Typography>
                            </Box>
                            <IconButton aria-label="edit experience" onClick={handleOpenAddExperienceDialog}>
                                <AddIcon />
                            </IconButton>
                            {addEducationDialog}
                        </Box>

                        <Box className="profile-jobs-text">
                            {educationBlock}
                        </Box>
                    </Card>

                </Box>
            </div>
        </body>
    );
};

export default ProfilePageEducation;
function navigatetBackToHome() {
    throw new Error("Function not implemented.");
}

