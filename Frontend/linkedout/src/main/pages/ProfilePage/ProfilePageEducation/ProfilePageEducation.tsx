import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApplicantProfile } from "../hooks";


export const ProfilePageEducation = () => {
    const { navigateBackFromEducation } = useApplicantProfile();

    return (
        <body>
            <NavBar />
            <div className="profile-body">
                <Box className="profile-cards">
                <Card className="profile-jobs">
                    <Box className="profile-jobs-title">
                        <Box sx={{display:"flex"}}>
                            <IconButton aria-label="edit experience" onClick={navigateBackFromEducation}>
                                <ArrowBackIcon/>
                            </IconButton>
                            <Typography variant="h5" component="div" sx={{marginTop:"0.25em"}}>
                            Education
                            </Typography>
                        </Box>
                        <IconButton aria-label="edit experience" onClick={ () => (("/profile-edit-education"))}>
                        <EditIcon/>
                        </IconButton>
                    </Box>
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
        </body>
    );
};

export default ProfilePageEducation;
