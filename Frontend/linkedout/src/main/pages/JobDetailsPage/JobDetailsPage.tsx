import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Avatar, Box, Button, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography, Snackbar, Alert } from '@mui/material';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { useApplicant, useJobDetails } from './hooks';

import './JobDetailsPage.css';
import Footer from '../../../components/Footer/Footer';

const JobDetailsPage = () => {
    const { isEmployer, isOtherEmployer, applicants, jobDetails, jobRecruiter, handleCandidateAcception, handleSeeApplicantProfile } = useJobDetails();
    const {
        showSuccessNotification,
        showFailNotification,
        handleApply,
        setShowSuccessNotification,
        setShowFailNotification,
        hasApplied
    } = useApplicant();
    
    return (
        <>
            <NavBar />
            <div className='job-details-wrapper'>
                <Card className='jobDetails-container'>
                    <CardContent className='jobDetails-meta'>
                        <Typography variant='h2' className='jobDetails-company'>{jobRecruiter?.company ?? ""}</Typography>
                        <Typography variant='h3' className='jobDetails-position'>{jobDetails?.title ?? ""}</Typography>
                        <Box className='jobDetails-specifics'>
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
                        </Box>
                    </CardContent>
                    <CardContent className='jobDetails-main'>
                        <div className={`job-requirements ${isEmployer && isOtherEmployer ? "other-employer" : ""}`}>
                            <p className='job-description-header'>About the job:</p>
                            <p className='job-description'>{jobDetails?.description ?? ""}</p>
                        </div>
                        { isEmployer && isOtherEmployer ? 
                            null 
                            :
                            <div className={`application-form ${ isEmployer ? "employer-view" : ""}`}>
                                { !isEmployer ? 
                                    <>
                                        <p className='form-hint'>Interested? One click and you're a candidate already! Yep, it's just as simple as that.</p>
                                        <div className="form">
                                            <Button
                                                disabled={hasApplied}
                                                className='apply-btn' 
                                                variant='contained'
                                                onClick={() => handleApply()}
                                            >
                                                Apply
                                            </Button>
                                            <Snackbar 
                                                open={showSuccessNotification} 
                                                autoHideDuration={3500} 
                                                anchorOrigin={{ vertical: "bottom", horizontal: "center"}} 
                                                onClose={() => setShowSuccessNotification(false) }
                                            >
                                                <Alert severity={"success"}>Congrats, you have successfully applied!</Alert>
                                            </Snackbar>
                                            <Snackbar 
                                                open={showFailNotification} 
                                                autoHideDuration={3500} 
                                                anchorOrigin={{ vertical: "bottom", horizontal: "center"}} 
                                                onClose={() => setShowFailNotification(false) }
                                            >
                                                <Alert severity={"error"}>Oops! Something went wrong while applying to this job. Please try again later.</Alert>
                                            </Snackbar>
                                        </div>
                                    </> :
                                    <>
                                        <p className='job-description-header'>List of Applicants:</p>
                                        <List className={"applicant-list"}>
                                            { applicants.map(applicant => {
                                                    return (
                                                        <ListItem key={applicant.applicant_id.toString()}
                                                            secondaryAction = {
                                                                <div>
                                                                    { applicant.application_accepted === null &&
                                                                        <>
                                                                            <Tooltip 
                                                                                title={`Reject ${applicant.first_name} ${applicant.last_name}'s application?`} 
                                                                                placement={"top"}
                                                                                onClick={() => handleCandidateAcception(applicant.applicant_id, false)}
                                                                            >
                                                                                <IconButton edge={"end"}>
                                                                                    <CancelIcon color='error'/>
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            <Tooltip 
                                                                                title={`Accept ${applicant.first_name} ${applicant.last_name}'s application?`} 
                                                                                placement={"top"}
                                                                                onClick={() => handleCandidateAcception(applicant.applicant_id, true)}
                                                                            >
                                                                                <IconButton edge={"end"}>
                                                                                    <CheckIcon color='success'/>
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </>
                                                                    }
                                                                    { applicant.application_accepted !== null &&
                                                                        <Tooltip title={`Application ${applicant.application_accepted ? "Accepted" : "Rejected"}! Candidate informed`} placement={"top"}>
                                                                            <IconButton edge={"end"}>
                                                                                <PermContactCalendarIcon color={`${applicant.application_accepted ? "success" : "error"}`}/>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    }
                                                                    <Tooltip 
                                                                        title={`See ${applicant.first_name} ${applicant.last_name}'s profile`}
                                                                        placement={"top"}
                                                                        onClick={() => handleSeeApplicantProfile(applicant.user_id)}
                                                                    >
                                                                        <IconButton edge={"end"}>
                                                                            <VisibilityIcon color='info'/>
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
                                                            <ListItemText primary={`${applicant.first_name} ${applicant.last_name} applied on ${applicant.application_date}`}/>
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </>
                                }
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
            <Footer/>
        </>
    ); 
}

export default JobDetailsPage;