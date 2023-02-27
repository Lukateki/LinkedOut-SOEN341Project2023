import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { useRegister } from './hooks';
import './RegistrationPage.css';

export const RegistrationPage = () => {
    //Toggles between the student and employer forms 
    const { handleRegisterBtnClick } = useRegister();
    const [toggleStudent, setToggleStudent] = useState(false)
    const [toggleEmployer, setToggleEmployer] = useState(false)
    const [colorStudent, setColorStudent] = useState(true)
    const [colorEmployer, setColorEmployer] = useState(true)

    return (
        <div className='registration-page-wrapper'>
        <h2 className='linkedout-banner'>LinkedOut</h2>
        <h3 className='student-employer-choice'> Are you a:</h3>
        <div className='user-choice'>
            <Button
                className='student-btn'
                variant = {colorStudent? "outlined" : "contained"}
                size='large'
                onClick={() =>{ 
                    setToggleStudent(!toggleStudent)
                    setColorStudent(!colorStudent)
                    setToggleEmployer(false)
                    setColorEmployer(true)
                }}
            >
                Student
            </Button>

            <Button
                className='employer-btn'
                variant = {colorEmployer? "outlined" : "contained"}
                size='large'
                onClick={() => {
                    setToggleEmployer(!toggleEmployer)
                    setColorEmployer(!colorEmployer)
                    setToggleStudent(false)
                    setColorStudent(true)
                }}
            >
                Employer
            </Button>
        </div>

        {/*The student form*/}
        {toggleStudent && (
        <div className='registration-container'>
            <TextField
                className='fullName-student-field'
                label="Full name"     
            />
            <TextField
                className='email-student-field'
                label="Email"
                type="email"
            />
            <TextField
                className='password-student-field'
                label="Password"
                type="password"
            />    
            
            <Button 
                className='registration-student-btn'
                variant='contained'
                onClick={handleRegisterBtnClick}
            >
                Register
            </Button> 
        </div>
        )}

        {/*The employer form*/}
        {toggleEmployer && (
        <div className='registration-container'>
            <TextField
                className='fullName-employer-field'
                label="Full Name"     
            />
            <TextField
                className='company-employer-field'
                label= 'Company'
            />
            <TextField
                className='email-employer-field'
                label="Email"
                type="email"
            />
            <TextField
                className='password-employer-field'
                label="Password"
                type="password"
            />  
              
            <Button 
                className='registration-employer-btn'
                variant='contained'
                onClick={handleRegisterBtnClick}
            >
                Register
            </Button> 
        </div>
        )}
    </div>
    )
}

export default RegistrationPage;