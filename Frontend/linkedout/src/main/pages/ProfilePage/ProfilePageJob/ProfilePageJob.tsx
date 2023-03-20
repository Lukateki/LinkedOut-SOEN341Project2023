import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
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

    const experienceBlock = experience.map((item, i, row) => {
        if(i + 1 === row.length) {
          return (
            <><Box className="profile-jobs-text-details" id={"job-" + i}>
                <IconButton aria-label="edit experience" onClick={() => (("/profile-edit-experience"))} sx={{float:"right"}}>
                    <EditIcon />
                </IconButton>
                <Typography variant="h6">{item["title"]}</Typography>
                <Typography variant="subtitle1">{item["company"]}</Typography>
                <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
                <Typography variant="body2">{item["description"]}</Typography>
              </Box></>
          )}
        else{
          return(
            <><Box className="profile-jobs-text-details">
                <IconButton aria-label="edit experience" onClick={() => (("/profile-edit-experience"))} sx={{float:"right"}}>
                    <EditIcon />
                </IconButton>
                <Typography variant="h6">{item["title"]}</Typography>
                <Typography variant="subtitle1">{item["company"]}</Typography>
                <Typography variant="subtitle2" color="rgba(39, 48, 61, 0.75)">{item["start_date"].split("-")[0]} - {item["end_date"].split("-")[0]}</Typography>
                <Typography variant="body2">{item["description"]}</Typography>
              </Box>
              <Divider variant="middle" /></>
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
                                <IconButton aria-label="edit experience" onClick={navigateBackFromExperience}>
                                    <ArrowbackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{marginTop:"0.25em"}}>
                                    Experience
                                </Typography>
                            </Box>
                            <IconButton aria-label="edit experience" onClick={() => (("/profile-edit-experience"))}>
                                <AddIcon />
                            </IconButton>
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
