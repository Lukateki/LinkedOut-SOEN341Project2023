import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowbackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const ProfilePageJob = () => {

    const navigate = useNavigate();
    
    return (
        <body>
            <NavBar />
            <div className="profile-body">
                <Box className="profile-cards">
                    <Card className="profile-jobs">
                        <Box className="profile-jobs-title">
                            <Box sx={{ display: "flex" }}>
                                <IconButton aria-label="edit experience" onClick={() => (navigate("/profile"))}>
                                    <ArrowbackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{marginTop:"0.25em"}}>
                                    Experience
                                </Typography>
                            </Box>
                            <IconButton aria-label="edit experience" onClick={() => (("/profile-edit-experience"))}>
                                <EditIcon />
                            </IconButton>
                        </Box>

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

                </Box>
            </div>
        </body>
    );
};

export default ProfilePageJob;
