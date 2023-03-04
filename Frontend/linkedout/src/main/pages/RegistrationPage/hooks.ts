import { ChangeEvent, useEffect, useState } from "react";
import { register_applicant, register_recruiter, register_user, update_applicant, update_recruiter } from "../../../axiosconfig";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../LoginPage/types";
 

export const useRegisterStudent = () => {
    const [firstNameStudent, setFirstNameS] = useState("");
    const [lastNameStudent, setLastNameS] = useState("");
    const [emailStudent, setEmailS] = useState("");
    const [usernameStudent, setUsernameS] = useState("");
    const [passwordStudent, setPasswordS] = useState("");
    const isUserAuthenticated = isUserLoggedIn();
    
    //errors for empty/invalid fields
    const [errorS1, setErrorS1] = useState(false);
    const [errorS2, setErrorS2] = useState(false);
    const [errorS3, setErrorS3] = useState(false);
    const [errorS4, setErrorS4] = useState(false);
    const [errorS5, setErrorS5] = useState(false);


    const navigate = useNavigate();

    const handleFirstNameStudentChange = (inputFirstName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS1(false);
        setFirstNameS(inputFirstName.target.value);
    }
    const handleLastNameStudentChange = (inputLastName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS2(false);
        setLastNameS(inputLastName.target.value);
    }
    
    const handleEmailStudentChange = (inputEmail: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS3(false);
        setEmailS(inputEmail.target.value);
    }

    const handleUsernameStudentChange = (inputUsername: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS4(false);
        setUsernameS(inputUsername.target.value);
    }
    const handlePasswordStudentChange = (inputPassword: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS5(false);
        setPasswordS(inputPassword.target.value);
    }
    

    const handleRegisterStudentBtnClick =() => {
        if(firstNameStudent === ''){
            setErrorS1(true)
        }
        if(lastNameStudent === ''){
            setErrorS2(true)
        }
        if(emailStudent === ''|| !emailStudent.includes("@")){
            setErrorS3(true)
        }
        if(usernameStudent === ''){
            setErrorS4(true)
        }
        if(passwordStudent === ''){
            setErrorS5(true)
        }

        //they must all be false
        if (!errorS1 && !errorS2 && !errorS3 && !errorS4 && !errorS5 ){
            var applicantID = -1;
            register_applicant(emailStudent).then(result => {
                const registeredApplicant = result.data;
                var tempApplicantID = registeredApplicant.id;
                setErrorS1(false);
                setErrorS2(false);
                setErrorS3(false);
                setErrorS4(false);
                setErrorS5(false);
                applicantID=tempApplicantID;
                register_user(firstNameStudent, lastNameStudent, emailStudent, usernameStudent, passwordStudent).then(success => {
                    const userID = success.data.user_id;
                    update_applicant(applicantID, userID)
                    navigate("/login")
                })
            })
        }
    }
    
    useEffect(() => {
        if (isUserAuthenticated) {
            navigate("/");
        }
    });

    return { handleRegisterStudentBtnClick, firstNameStudent , lastNameStudent, emailStudent, usernameStudent, passwordStudent, handleFirstNameStudentChange, handleLastNameStudentChange, handleEmailStudentChange, handleUsernameStudentChange, handlePasswordStudentChange, errorS1, errorS2, errorS3, errorS4, errorS5};
}



export const useRegisterEmployer = () => {
    
    const [firstNameEmployer, setFirstNameE] = useState("");
    const [lastNameEmployer, setLastNameE] = useState("");
    const [emailEmployer, setEmailE] = useState("");
    const [usernameEmployer, setUsernameE] = useState("");
    const [passwordEmployer, setPasswordE] = useState("");
    const [company, setCompany] = useState("");
    const isUserAuthenticated = isUserLoggedIn();
    
    //errors for empty/invalid fields
    const [errorE1, setErrorE1] = useState(false);
    const [errorE2, setErrorE2] = useState(false);
    const [errorE3, setErrorE3] = useState(false);
    const [errorE4, setErrorE4] = useState(false);
    const [errorE5, setErrorE5] = useState(false);
    const [errorE6, setErrorE6] = useState(false);



    const navigate = useNavigate();

    const handleFirstNameEmployerChange = (inputFirstName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE1(false);
        setFirstNameE(inputFirstName.target.value);
    }
    const handleLastNameEmployerChange = (inputLastName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE2(false);
        setLastNameE(inputLastName.target.value);
    }
    
    const handleEmailEmployerChange = (inputEmail: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE3(false);
        setEmailE(inputEmail.target.value);
    }

    const handleUsernameEmployerChange = (inputUsername: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE4(false);
        setUsernameE(inputUsername.target.value);
    }
    const handlePasswordEmployerChange = (inputPassword: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE5(false);
        setPasswordE(inputPassword.target.value);
    }

    const handleCompanyChange = (inputCompany: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE6(false);
        setCompany(inputCompany.target.value);
    }
    

    const handleRegisterEmployerBtnClick =() => {
        if(firstNameEmployer === ''){
            setErrorE1(true)
        }
        if(lastNameEmployer ===''){
            setErrorE2(true)
        }
        if(emailEmployer === ''|| !emailEmployer.includes("@")){
            setErrorE3(true)
        }
        if(usernameEmployer === ''){
            setErrorE4(true)
        }
        if(passwordEmployer === ''){
            setErrorE5(true)
        }
        if (company === ''){
            setErrorE6(true)
        }

        //they must all be false
        if (!errorE1 && !errorE2 && !errorE3 && !errorE4 && !errorE5 && !errorE6){
            var recruiterID = -1;
            register_recruiter(company, "montreal", emailEmployer).then(result => {
                const registeredRecruiter = result.data;
                var tempRecruiterID = registeredRecruiter.id;
                setErrorE1(false);
                setErrorE2(false);
                setErrorE3(false);
                setErrorE4(false);
                setErrorE5(false);
                setErrorE6(false);

                recruiterID=tempRecruiterID;
                register_user(firstNameEmployer, lastNameEmployer, emailEmployer, usernameEmployer, passwordEmployer).then(success => {
                    const userID = success.data.user_id;
                    console.log(userID)
                    update_recruiter(recruiterID, userID)
                    navigate("/login")
                })
            })
        }
    }

    useEffect(() => {
        if (isUserAuthenticated) {
            navigate("/");
        }
    });

    return { handleRegisterEmployerBtnClick, firstNameEmployer , lastNameEmployer, emailEmployer, usernameEmployer, passwordEmployer, company, handleFirstNameEmployerChange, handleLastNameEmployerChange, handleEmailEmployerChange, handleUsernameEmployerChange, handlePasswordEmployerChange, handleCompanyChange, errorE1, errorE2, errorE3, errorE4, errorE5, errorE6};
}
