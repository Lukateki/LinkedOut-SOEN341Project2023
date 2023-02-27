import React from 'react';
import { Button, TextField } from '@mui/material';
import { useLogin } from './hooks';
import './LoginPage.css';

const LoginPage = () => {
    
    const { handleLoginBtnClick, loginUsername, loginPassword, handleUsernameChange, handlePasswordChange, error } = useLogin();
    
    return (
        <div className='login-page-wrapper'>
            <h2 className='linkedout-banner'>LinkedOut</h2>
            <div className='login-container'>
                <TextField
                    className='username-field'
                    label="Username"
                    value={loginUsername}
                    onChange={handleUsernameChange}
                    error={error}
                    helperText={ error ? "Invalid Username" : "" }
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
            </div>
        </div>
    )
}

export default LoginPage;