import React, { useState, useEffect } from 'react';
import { get_all_jobs } from '../../../axiosconfig';
import NavBar from '../../../components/NavBar/NavBar';
import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import './AddJobListing.css';
import { useUploadJob } from './hooks';

const AddJobListingPage = () => {
    const { handleUploadJobBtnClick, handleTitleChange, handleRecruiterChange, handleTypeChange, handleCityChange, handleDateChange, handleExpiryChange, handleDescriptionChange,handleUrlChange, title, recruiter,type, city, date, expiry, description, url } = useUploadJob();
    
    const jobTypes = [
        {
            value: 'Full-time',
            label: 'Full-time',
        },
        {
          value: 'Internship',
          label: 'Internship',
        },
        {
          value: 'Seasonal',
          label: 'Seasonal',
        },
        {
          value: 'Part-time',
          label: 'Part-time',
        },
      ];

    return(
        <div className="add-job-container">
            <NavBar/>
            <div className="add-job-content">
                <h2>Create a New Job Listing</h2>
                <div className='double-columns'>
                    <TextField
                        className='job-title'
                        label="Job Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        className='job-recruiter'
                        label="Recruiting Company"
                        value={recruiter}
                        onChange={handleRecruiterChange}
                    />
                </div>
                <div className='double-columns'>
                    <TextField
                        className='job-type'
                        select
                        SelectProps={{    
                            native:true
                        }}
                        value={type}
                        onChange={handleTypeChange}

                    >
                        {jobTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        className='job-location'
                        label="location(city)"
                        value={city}
                        onChange={handleCityChange}
                    />
                </div>
                <div className='double-columns'>
                    <TextField
                        className='job-posting-date'
                        label="Current Date"
                        value={date}
                        onChange={handleDateChange}

                    />
                    <TextField
                        className='job-expiry-date'
                        label="Expiry Date"
                        value={expiry}
                        onChange={handleExpiryChange}

                    />
                </div>
                <TextField
                    className='job-description'
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}

                />
                <TextField
                    className='job-url'
                    label="Url"
                    value={url}
                    onChange={handleUrlChange}

                />
                <Button 
                    className='upload-job-btn'
                    variant='contained'
                    onClick={handleUploadJobBtnClick}
                >
                    Upload Job
                </Button> 
            </div>
        </div>

    );
    
}

export default AddJobListingPage;