import React from 'react';
import { Button, TextField } from '@mui/material';
import { useLogin } from './hooks';
import './LoginPage.css';

const LoginPage = () => {
    
    const { handleLoginBtnClick } = useLogin();
    
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
                <Button 
                    className='login-btn'
                    variant='contained'
                    onClick={handleLoginBtnClick}
                >
                    Login
                </Button> 
                <Button 
                    className='register-btn' 
                    onClick={handleLoginBtnClick}
                    href="/RegistrationPage"
                >
                    Create account
                </Button> 
    
            </div>
        </div>
    )
}

export default LoginPage;