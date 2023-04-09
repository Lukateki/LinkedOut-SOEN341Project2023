import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { useRegisterStudent , useRegisterEmployer } from './hooks';
import './RegistrationPage.css';

export const RegistrationPage = () => {
    //Toggles between the student and employer forms 
    const { handleRegisterStudentBtnClick, firstNameStudent, lastNameStudent, emailStudent, passwordStudent, errorS1, errorS2, errorS3, errorS4, handleFirstNameStudentChange, handleLastNameStudentChange, handleEmailStudentChange, handlePasswordStudentChange} = useRegisterStudent();
    const { handleRegisterEmployerBtnClick, firstNameEmployer, lastNameEmployer, emailEmployer, passwordEmployer, company, headquarter, errorE1, errorE2, errorE3, errorE4, errorE5, errorE6, handleHeadquarterChange, handleCompanyChange, handleFirstNameEmployerChange, handleLastNameEmployerChange, handleEmailEmployerChange, handlePasswordEmployerChange} = useRegisterEmployer();


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
            <div className='names'>
                <TextField
                    className='firstName-student-field'
                    label="First Name"
                    value={firstNameStudent}
                    onChange={handleFirstNameStudentChange}
                    error={errorS1}
                    helperText={ errorS1 ? "Invalid First Name" : "" }

                />
                <TextField
                    className='lastName-student-field'
                    label="Last Name"
                    value={lastNameStudent}
                    onChange={handleLastNameStudentChange}
                    error={errorS2}
                    helperText={ errorS2 ? "Invalid Last Name" : "" }

                />
            </div>

            <TextField
                className='email-student-field'
                label="Email"
                type="email"
                value={emailStudent}
                onChange={handleEmailStudentChange}
                error={errorS3}
                helperText={ errorS3 ? "Invalid Email" : "" }
            />

            <TextField
                className='password-student-field'
                label="Password"
                type="password"
                value={passwordStudent}
                onChange={handlePasswordStudentChange}
                error={errorS4}
                helperText={ errorS4 ? "Invalid Password (must be 8 characters or longer)" : "" }
            />    
            
            <Button
                disabled={ errorS1 || errorS2 || errorS3 || errorS4 }
                className='registration-student-btn'
                variant='contained'
                onClick={handleRegisterStudentBtnClick}
            >
                Register
            </Button> 
        </div>
        )}

        {/*The employer form*/}
        {toggleEmployer && (
        <div className='registration-container'>
            <div className='names'>
                <TextField
                    className='firstName-employer-field'
                    label="First Name" 
                    value={firstNameEmployer}
                    onChange={handleFirstNameEmployerChange}
                    error={errorE1}
                    helperText={ errorE1 ? "Invalid First Name" : "" }    
                />
                <TextField
                    className='lastName-employer-field'
                    label="Last Name"
                    value={lastNameEmployer}
                    onChange={handleLastNameEmployerChange}
                    error={errorE2}
                    helperText={ errorE2 ? "Invalid Last Name" : "" }     
                />
            </div>
            <div className='company-info'>
                <TextField
                    className='company-employer-field'
                    label= 'Company'
                    value={company}
                    onChange={handleCompanyChange}
                    error={errorE5}
                    helperText={ errorE5 ? "Invalid Company" : "" }
                />
                <TextField
                    className='headquarter-employer-field'
                    label= 'Headquarter'
                    value={headquarter}
                    onChange={handleHeadquarterChange}
                    error={errorE6}
                    helperText={ errorE6 ? "Invalid Headquarters" : "" }
                />
            </div>
            <TextField
                className='email-employer-field'
                label="Email"
                type="email"
                value={emailEmployer}
                onChange={handleEmailEmployerChange}
                error={errorE3}
                helperText={ errorE3 ? "Invalid Email" : "" }
            />

            <TextField
                className='password-employer-field'
                label="Password"
                type="password"
                value={passwordEmployer}
                onChange={handlePasswordEmployerChange}
                error={errorE4}
                helperText={ errorE4 ? "Invalid Password (must be 8 or more characters)" : "" }
            />  
              
            <Button 
                className='registration-employer-btn'
                variant='contained'
                disabled={errorE1 || errorE2 || errorE3 || errorE4 || errorE5 || errorE6}
                onClick={handleRegisterEmployerBtnClick}
            >
                Register
            </Button> 
        </div>
        )}
    </div>
    )
}

export default RegistrationPage;