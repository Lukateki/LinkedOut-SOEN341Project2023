import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip } from '@mui/material';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { useApplicant, useJobDetails } from './hooks';

import './JobDetailsPage.css';

const JobDetailsPage = () => {
    const { isEmployer, isOtherEmployer, applicants, jobDetails, jobRecruiter } = useJobDetails();
    const { 
        firstName, 
        lastName, 
        address, 
        phone, 
        email,
        handleFirstNameChange,
        handleLastNameChange,
        handlePhoneChange,
        handleAddressChange,
        handleEmailChange,
        handleApply
    } = useApplicant();

    return (
        <div className='job-details-wrapper'>
            <NavBar />
            <div className='jobDetails-container'>
                <h1 className='jobDetails-company'>{jobRecruiter?.company ?? ""}</h1>
                <div className='jobDetails-meta'>
                    <h3 className='jobDetails-position'>{jobDetails?.title ?? ""}</h3>
                    <div className='jobDetails-specifics'>
                        <Box>
                            <EventAvailableRoundedIcon color={'success'}/>
                            <p className='post-date'>Posting Date: {jobDetails?.posting_date ?? ""}</p>
                        </Box>
                        <Box>
                            <EventBusyRoundedIcon color={"warning"}/>
                            <p className='expiry-date'>Expiry Date: {jobDetails?.expiry_date ?? ""}</p>
                        </Box>                        
                        <Box>
                            <LocationCityRoundedIcon color={'secondary'}/>
                            <p className='city'>City: {jobDetails?.city ?? ""}</p>
                        </Box>
                        <Box>
                            <WorkHistoryRoundedIcon color={"primary"}/>
                            <p className='type'>Job Type: {jobDetails?.job_type ?? ""}</p>
                        </Box>
                    </div>
                </div>
                <div className='jobDetails-main'>
                    <div className={`job-requirements ${isEmployer && isOtherEmployer ? "other-employer" : ""}`}>
                        <p className='job-description-header'>About the job:</p>
                        <p className='job-description'>{jobDetails?.description ?? ""}</p>
                    </div>
                    { isEmployer && isOtherEmployer ? 
                        null 
                        :
                        <div className={`application-form ${ isEmployer ? "employer-view" : ""}`}>
                            { !isEmployer ? 
                                <Box>
                                    <p className='form-hint'>Interested? Apply here!</p>
                                    <div className="form">
                                        <TextField 
                                            className="form-input" 
                                            label={"First Name"} 
                                            variant={"outlined"} 
                                            color={"info"} 
                                            value={firstName}
                                            onChange={handleFirstNameChange}
                                        />
                                        <TextField 
                                            className="form-input" 
                                            label={"Last Name"} 
                                            variant={"outlined"} 
                                            color={"info"}
                                            value={lastName}
                                            onChange={handleLastNameChange}
                                        />
                                        <TextField 
                                            className="form-input" 
                                            label={"Email"} 
                                            variant={"outlined"} 
                                            color={"info"}
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        <TextField 
                                            className="form-input" 
                                            label={"Phone Number"} 
                                            variant={"outlined"} 
                                            color={"info"}
                                            value={phone}
                                            onChange={handlePhoneChange}
                                        />
                                        <TextField 
                                            className="form-input" 
                                            label={"Address"} 
                                            variant={"outlined"} 
                                            color={"info"}
                                            value={address}
                                            onChange={handleAddressChange}
                                        />
                                        <Button 
                                            style={{ width: "40%", marginLeft:"auto", marginRight: "auto"}} 
                                            variant='contained'
                                            onClick={() => handleApply()}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </Box> :
                                <Box>
                                    <p className='job-description-header'>List of Applicants:</p>
                                    <List className={"applicant-list"}>
                                        { applicants?.map(applicant => {
                                                return (
                                                    <ListItem key={applicant.applicant_id}
                                                        secondaryAction = {
                                                            <div>
                                                                <Tooltip title={`See ${applicant.first_name} ${applicant.last_name}'s cover letter`} placement={"top"}>
                                                                    <IconButton edge={"end"}>
                                                                        <HistoryEduRoundedIcon color='primary'/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title={`See ${applicant.first_name} ${applicant.last_name}'s CV`} placement={"top"}>
                                                                    <IconButton edge={"end"}>
                                                                        <DriveFolderUploadRoundedIcon color='secondary'/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        }
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <PersonRoundedIcon color='info'/>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={`${applicant.first_name} ${applicant.last_name} applied on 2023-23-23`}/>
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Box>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    ); 
}

export default JobDetailsPage;