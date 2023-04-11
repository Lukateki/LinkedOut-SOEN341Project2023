import { ChangeEvent, useEffect, useState } from "react";
import { register_applicant, register_recruiter, register_user, update_applicant, update_recruiter } from "../../../axiosconfig";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../LoginPage/types";
 

export const useRegisterStudent = () => {
    const [firstNameStudent, setFirstNameS] = useState("");
    const [lastNameStudent, setLastNameS] = useState("");
    const [emailStudent, setEmailS] = useState("");
    const [passwordStudent, setPasswordS] = useState("");
    const isUserAuthenticated = isUserLoggedIn();
    
    //errors for empty/invalid fields
    const [errorS1, setErrorS1] = useState(false);
    const [errorS2, setErrorS2] = useState(false);
    const [errorS3, setErrorS3] = useState(false);
    const [errorS4, setErrorS4] = useState(false);

    const navigate = useNavigate();
    
    const isValidName = (name: string) => {
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/;
        return nameRegex.test(name);
    }
    
    const isValidEmail = (email: string) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }
    
    const handleFirstNameStudentChange = (inputFirstName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS1(!isValidName(inputFirstName.target.value));
        setFirstNameS(inputFirstName.target.value);
    }

    const handleLastNameStudentChange = (inputLastName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS2(!isValidName(inputLastName.target.value));
        setLastNameS(inputLastName.target.value);
    }
    
    const handleEmailStudentChange = (inputEmail: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS3(!isValidEmail(inputEmail.target.value));
        setEmailS(inputEmail.target.value);
    }

    const handlePasswordStudentChange = (inputPassword: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorS4(inputPassword.target.value.length < 8);
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

        if(passwordStudent === ''){
            setErrorS4(true)
        }

        //they must all be false
        if (!errorS1 && !errorS2 && !errorS3 && !errorS4){
            let applicantID = -1;
            register_applicant(emailStudent).then(result => {
                const registeredApplicant = result.data;
                let tempApplicantID = registeredApplicant.id;
                applicantID=tempApplicantID;
                register_user(firstNameStudent, lastNameStudent, emailStudent, passwordStudent).then(success => {
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

    return { handleRegisterStudentBtnClick, firstNameStudent , lastNameStudent, emailStudent,passwordStudent, handleFirstNameStudentChange, handleLastNameStudentChange, handleEmailStudentChange,handlePasswordStudentChange, errorS1, errorS2, errorS3, errorS4 };
}



export const useRegisterEmployer = () => {
    
    const [firstNameEmployer, setFirstNameE] = useState("");
    const [lastNameEmployer, setLastNameE] = useState("");
    const [emailEmployer, setEmailE] = useState("");
    const [passwordEmployer, setPasswordE] = useState("");
    const [company, setCompany] = useState("");
    const [headquarter, setHeadquarter] = useState("");
    const isUserAuthenticated = isUserLoggedIn();
    
    //errors for empty/invalid fields
    const [errorE1, setErrorE1] = useState(false);
    const [errorE2, setErrorE2] = useState(false);
    const [errorE3, setErrorE3] = useState(false);
    const [errorE4, setErrorE4] = useState(false);
    const [errorE5, setErrorE5] = useState(false);
    const [errorE6, setErrorE6] = useState(false);

    const navigate = useNavigate();

    const isValidName = (name: string) => {
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/;
        return nameRegex.test(name);
    }
    
    const isValidEmail = (email: string) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    const handleFirstNameEmployerChange = (inputFirstName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE1(!isValidName(inputFirstName.target.value));
        setFirstNameE(inputFirstName.target.value);
    }

    const handleLastNameEmployerChange = (inputLastName: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE2(!isValidName(inputLastName.target.value));
        setLastNameE(inputLastName.target.value);
    }
    
    const handleEmailEmployerChange = (inputEmail: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE3(!isValidEmail(inputEmail.target.value));
        setEmailE(inputEmail.target.value);
    }

    const handlePasswordEmployerChange = (inputPassword: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE4(inputPassword.target.value.length < 8);
        setPasswordE(inputPassword.target.value);
    }

    const handleCompanyChange = (inputCompany: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE5(inputCompany.target.value.length === 0);
        setCompany(inputCompany.target.value);
    }
    const handleHeadquarterChange = (inputHeadquarter: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorE6(inputHeadquarter.target.value.length === 0);
        setHeadquarter(inputHeadquarter.target.value);
    }

    const handleRegisterEmployerBtnClick =() => {
        //they must all be false
        if (!errorE1 && !errorE2 && !errorE3 && !errorE4 && !errorE5 && !errorE6){
            let recruiterID = -1;
            register_recruiter(company, headquarter, emailEmployer).then(result => {
                const registeredRecruiter = result.data;
                let tempRecruiterID = registeredRecruiter.id;
                recruiterID = tempRecruiterID;
                register_user(firstNameEmployer, lastNameEmployer, emailEmployer,passwordEmployer).then(success => {
                    const userID = success.data.user_id;
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

    return { handleRegisterEmployerBtnClick, firstNameEmployer , lastNameEmployer, emailEmployer,passwordEmployer, company, headquarter, handleFirstNameEmployerChange, handleLastNameEmployerChange, handleEmailEmployerChange,handlePasswordEmployerChange, handleCompanyChange,handleHeadquarterChange, errorE1, errorE2, errorE3, errorE4, errorE5, errorE6};
}
