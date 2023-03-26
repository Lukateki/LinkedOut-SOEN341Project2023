import { useState, ChangeEvent, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth_token_cookie_name, get_job_recruiter, retrieve_job_applications, retrieve_job_details, retrieve_session_user } from "../../../axiosconfig";
import { isUserLoggedIn } from "../LoginPage/types";

export const useJobDetails = () => {
    const { id: job_id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [jobRecruiter, setJobRecruiter] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [applicants, setApplicants] = useState(undefined);
    const [jobDetails, setJobDetails] = useState(undefined);
    const [isEmployer, setIsEmployer] = useState(true);
    const [isOtherEmployer, setIsOtherEmployer] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            if (jobDetails === undefined) {
                retrieve_job_details(job_id).then(s => {
                    setJobDetails(s.data);
                    get_job_recruiter(s.data.recruiter).then(s => {
                        setJobRecruiter(s.data);
                    })
                }).catch((e) => {
                    console.log(e);
                    navigate("/404");
                })
            }

            if (currentUser === undefined) {
                const token = new Cookies().get(auth_token_cookie_name);
                if (token !== undefined) {
                    retrieve_session_user(token).then(s => {
                        setCurrentUser(s.data);
                        setIsEmployer(s.data.isRecruiter);
                        if (s.data.isRecruiter) {
                            const recruiter_jobs = s.data.associated_jobs.map(j => j.id);
                            setIsOtherEmployer(!recruiter_jobs.includes(Number(job_id)));
                        }
                    }).catch((e) => {
                        console.log(e)
                        navigate("/404");
                    })
                }
            }

            if (applicants === undefined){
                retrieve_job_applications(job_id).then(s => {
                    setApplicants(s.data)
                }).catch((e) => {
                    console.log(e)
                    navigate("/404")
                })
            }
        }
    }, [loaded, jobDetails, applicants, currentUser, job_id, navigate])

    return { isEmployer, isOtherEmployer, jobDetails, applicants, jobRecruiter };
}

export const useApplicant = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFirstName(e.currentTarget.value);
    }

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLastName(e.currentTarget.value);
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value); 
    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       setAddress(e.currentTarget.value); 
    }

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPhone(e.currentTarget.value);
    }

    const handleApply = () => {
        //TODO
    }

    useEffect(() => {
        if (isAuthenticated === null) {
            setIsAuthenticated(isUserLoggedIn());
        }
    }, [isAuthenticated]);

    return { firstName, lastName, email, address, phone, handleFirstNameChange, handleLastNameChange, handleAddressChange, handlePhoneChange, handleEmailChange, handleApply }
}