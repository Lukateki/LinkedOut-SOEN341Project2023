import React from 'react';
import { Button, TextField } from '@mui/material';

import './LoginPage.css';

const LoginPage = () => {
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
                variant='contained'>
                    Login
                </Button> 
            </div>
        </div>
    )
}

export default LoginPage;