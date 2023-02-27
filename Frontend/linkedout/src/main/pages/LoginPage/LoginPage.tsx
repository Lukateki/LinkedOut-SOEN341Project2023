import React, { useState } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLogin } from './hooks';
import './LoginPage.css';

const LoginPage = () => {
    const { handleLoginBtnClick } = useLogin();
    const [userType, setUserType] = useState('student'); // set initial value to student
    const handleUserTypeChange = (event, newUserType) => {
      setUserType(newUserType);
    };
    return (
        <div className='login-page-wrapper'>
            <h2 className='linkedout-banner'>LinkedOut</h2>
            <div className='login-container'>
                <TextField
                    className='username-field'
                    label="Username"
                />
                <TextField
                    className='password-field'
                    label="Password"
                    type="password"
                />
                <ToggleButtonGroup
                  value={userType}
                  exclusive
                  onChange={handleUserTypeChange}
                  aria-label="user type"
                  className='user-type-field'
                >
                  <ToggleButton value="student" aria-label="student">
                    Student
                  </ToggleButton>
                  <ToggleButton value="employer" aria-label="employer">
                    Employer
                  </ToggleButton>
                </ToggleButtonGroup>
                <Button 
                    className='login-btn'
                    variant='contained'
                    onClick={handleLoginBtnClick}
                >
                    Login
                </Button> 
            </div>
        </div>
    )
}

export default LoginPage;