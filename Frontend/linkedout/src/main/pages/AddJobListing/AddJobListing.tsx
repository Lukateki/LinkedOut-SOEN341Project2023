import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import './AddJobListing.css';
import { useUploadJob } from './hooks';

const AddJobListingPage = () => {
    const { errorUrl, errorType,errorTitle,errorExpiry,errorDescription,errorDate,errorCity, handleUploadJobBtnClick, handleTitleChange, handleTypeChange, handleCityChange, handleDateChange, handleExpiryChange, handleDescriptionChange,handleUrlChange, title, type, city, date, expiry, description, url } = useUploadJob();
    
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
                        />
                        
                    <div className='double-columns'>
                        <TextField
                            className='job-type'
                            select
                            defaultValue={"Full-time"}
                            SelectProps={{    
                                native:true
                            }}
                            value={type}
                            onChange={handleTypeChange}
                            error={errorType}

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
                        />
                    </div>
                    <div className='double-columns'>
                        <TextField
                            className='job-posting-date'
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            helperText="Current Date"
                            error={errorDate}

                        />
                        <TextField
                            className='job-expiry-date'
                            type="date"
                            value={expiry}
                            onChange={handleExpiryChange}
                            helperText="Expiry Date"
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

                    />
                    <TextField
                        className='job-url'
                        label="Url"
                        value={url}
                        onChange={handleUrlChange}
                        error={errorUrl}

                    />
                    <Button 
                        className='upload-job-btn'
                        variant='contained'
                        onClick={handleUploadJobBtnClick}
                    >
                        Upload Job
                    </Button> 
                </Card>
            </div>
        </div>

    );
    
}

export default AddJobListingPage;