import React, { useState } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLogin } from './hooks';
import './LoginPage.css';

const LoginPage = () => {
    const { handleLoginBtnClick } = useLogin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState('student'); // set initial value to student

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
    const handleUserTypeChange = (event, newUserType) => {
      setUserType(newUserType);
    };
    return (
        <div className='login-page-wrapper'>
            <h2 className='linkedout-banner'>LinkedOut</h2>
            <div className='login-container'>
                <TextField
                    className='username-field'
                    label="Email"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    className='password-field'
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
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
