import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import './AddJobListing.css';
import { useUploadJob } from './hooks';

const AddJobListingPage = () => {
    const { errorUrl, errorTitle,errorExpiry,errorDescription, errorCity, handleUploadJobBtnClick, handleTitleChange, handleTypeChange, handleCityChange, handleExpiryChange, handleDescriptionChange,handleUrlChange, title, type, city, date, expiry, description, url } = useUploadJob();
    
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
                <Card className='card'>
                    <h2>CREATE NEW JOB LISTING</h2>
                        <TextField
                            className='job-title'
                            label="Job Title"
                            value={title}
                            onChange={handleTitleChange}
                            error={errorTitle}
                            helperText={errorTitle ? "Invalid Job title" : ""}
                        />
                        
                    <div className='double-columns'>
                        <TextField
                            className='job-type'
                            select
                            SelectProps={{    
                                native:true
                            }}
                            value={type}
                            onChange={handleTypeChange}
                            helperText={"Job Type"}
                        >
                            {jobTypes.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            className='job-location'
                            label="City"
                            value={city}
                            onChange={handleCityChange}
                            error={errorCity}
                            helperText={errorCity ? "Invalid City" : ""}
                        />
                    </div>
                    <div className='double-columns'>
                        <TextField
                            disabled={true}
                            className='job-posting-date'
                            type="date"
                            value={date}
                            helperText={"Posting Date"}
                        />
                        <TextField
                            className='job-expiry-date'
                            type="date"
                            value={expiry}
                            onChange={handleExpiryChange}
                            helperText={errorExpiry ? "Expiry Date cannot be before posting date" : ""}
                            error={errorExpiry}
                        />
                    </div>
                    <TextField
                        className='job-description'
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        error={errorDescription}
                        helperText={errorDescription ? "Invalid Description" : ""}
                    />
                    <TextField
                        className='job-url'
                        label="Url"
                        value={url}
                        onChange={handleUrlChange}
                        error={errorUrl}
                        helperText={errorUrl ? "Invalid URL" : ""}
                    />
                    <Button 
                        className='upload-job-btn'
                        variant='contained'
                        onClick={handleUploadJobBtnClick}
                        disabled={errorCity || errorDescription || errorExpiry || errorUrl || errorTitle}
                    >
                        Upload Job
                    </Button> 
                </Card>
            </div>
        </div>

    );
    
}

export default AddJobListingPage;