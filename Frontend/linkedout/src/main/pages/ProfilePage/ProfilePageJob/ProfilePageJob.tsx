import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, fabClasses, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useApplicantProfile } from "../hooks";
import ArrowbackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material";

export const ProfilePageJob = () => {
    const { getExperience, experience, setExperience, navigateBackFromExperience } = useApplicantProfile();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [bufferTitle, setBufferTitle] = React.useState("");
    const [bufferCompany, setBufferCompany] = React.useState("");
    const [bufferStartDate, setBufferStartDate] = React.useState("");
    const [bufferEndDate, setBufferEndDate] = React.useState("");
    const [bufferDescription, setBufferDescription] = React.useState("");
    const [currentExperience, setCurrentExperience] = React.useState(0);

    const handleOpenExperienceDialog = index => {
        setCurrentExperience(index);
        setBufferTitle(experience[index]["title"]);
        setBufferCompany(experience[index]["company"]);
        setBufferStartDate(experience[index]["start_date"]);
        setBufferEndDate(experience[index]["end_date"]);
        setBufferDescription(experience[index]["description"]);
        
        setOpenDialog(true);
    };

    const handleCloseExperienceDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteExperienceDialog = () => {
        setOpenDialog(false);
        setExperience(experience.slice(0, currentExperience).concat(experience.slice(currentExperience + 1, experience.length)));
    };

    const handleSaveExperienceDialog = () => {
        setOpenDialog(false);
        let e = experience;
        e[currentExperience]["title"] = bufferTitle;
        e[currentExperience]["company"] = bufferCompany;
        e[currentExperience]["start_date"] = bufferStartDate;
        e[currentExperience]["end_date"] = bufferEndDate;
        e[currentExperience]["description"] = bufferDescription;
        setExperience(e);
    };

    const handleAddExperienceDialog = () => {
        setOpenAddDialog(false);
        setExperience([...experience, {
            "title": bufferTitle,
            "company": bufferCompany,
            "start_date": bufferStartDate,
            "end_date": bufferEndDate,
            "description": bufferDescription
        }]);
    };

    const handleOpenAddExperienceDialog = () => {
        setBufferTitle("");
        setBufferCompany("");
        setBufferStartDate("");
        setBufferEndDate("");
        setBufferDescription("");
        setOpenAddDialog(true);
    };
    
    const addExperienceDialog = 
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
            id="title"
            label="Title"
            value={bufferTitle}
            onChange={(e) => setBufferTitle(e.target.value)}
            fullWidth
            variant="standard"
            />
            <TextField
            sx={{ marginTop: 0.5 }}
            autoFocus
            id="company"
            label="Company"
            value={bufferCompany}
            onChange={(e) => setBufferCompany(e.target.value)}
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
    const experienceBlock = experience.map((item, i, row) => {
        const experienceBox = 
        <><Box className="profile-jobs-text-details" >
            <IconButton aria-label="edit experience" component="div" onClick={ e => handleOpenExperienceDialog(i)} sx={{float:"right"}}>
                <EditIcon />
            </IconButton>
            <Dialog open={openDialog} onClose={handleCloseExperienceDialog}>
                <Box>
                <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <DialogTitle>Edit Experience</DialogTitle>
                    <IconButton aria-label="close experience" onClick={handleCloseExperienceDialog}>
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
                    onChange={(e) => setBufferTitle(e.target.value)}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    sx={{ marginTop: 0.5 }}
                    autoFocus
                    id="company"
                    label="Company"
                    value={bufferCompany}
                    onChange={(e) => setBufferCompany(e.target.value)}
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
            <Typography variant="h6">{item["title"]}</Typography>
            <Typography variant="subtitle1">{item["company"]}</Typography>
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
        getExperience();
    }, []);

    return (
        <body>
            <NavBar />
            <div className="profile-body">
                <Box className="profile-cards">
                    <Card className="profile-jobs">
                        <Box className="profile-jobs-title">
                            <Box sx={{ display: "flex" }}>
                                <IconButton aria-label="edit experience" onClick={navigateBackFromExperience} href="/profile#jobs">
                                    <ArrowbackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{marginTop:"0.25em"}}>
                                    Experience
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
