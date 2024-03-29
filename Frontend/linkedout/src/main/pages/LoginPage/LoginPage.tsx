import React from 'react';
import { Button, TextField } from '@mui/material';
import { useLogin } from './hooks';

import './LoginPage.css';

const LoginPage = () => {
    
    const { handleLoginBtnClick, handleRegistration, loginUsername, loginPassword, handleUsernameChange, handlePasswordChange, error } = useLogin();

    return (
        <div className='login-page-wrapper'>
            {/* <h2 className='linkedout-banner'>LinkedOut</h2> */}
            <div className='login-container'>
                <h2 className='linkedout-banner'>LinkedOut</h2>
                <TextField
                    className='username-field'
                    label="Email"
                    value={loginUsername}
                    onChange={handleUsernameChange}
                    error={error}
                    helperText={ error ? "Invalid Email" : "" }
                />
                <TextField
                    className='password-field'
                    label="Password"
                    type="password"
                    value={loginPassword}
                    onChange={handlePasswordChange}
                    error={error}
                    helperText={error ? "Invalid Password" : "" }
                />
                <Button 
                    className='login-btn'
                    variant='contained'
                    onClick={handleLoginBtnClick}
                >
                    Login
                </Button> 
                <Button 
                    className='register-btn'
                    onClick={handleRegistration}
                >
                    Create account
                </Button> 
                <Button onClick={() => window.location.href = 'http://127.0.0.1:8000/admin/'}>
                    Admin
                </Button>
            </div>
        </div>
    )
}

export default LoginPage;