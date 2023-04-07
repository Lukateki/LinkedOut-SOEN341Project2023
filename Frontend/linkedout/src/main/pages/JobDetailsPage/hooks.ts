import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth_token_cookie_name, candidate_has_applied_to_job, create_job_application, get_job_recruiter, retrieve_job_applications, retrieve_job_details, retrieve_session_user } from "../../../axiosconfig";
import { isUserLoggedIn } from "../LoginPage/types";
import { Applicant, JobApplication } from "./Types";

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
    const { id: job_id } = useParams();
    const [applicant, setApplicant] = useState<Applicant>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [hasApplied, setHasApplied] = useState(true);
    const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false);
    const [showFailNotification, setShowFailNotification] = useState<boolean>(false);

    const handleApply = async () => {
        const job_application: JobApplication = { applicant_id: applicant.applicant_id, job_id: Number(job_id) };
        await create_job_application(job_application).then(() => {
            setShowSuccessNotification(true);
            setHasApplied(true);
        }).catch(() => {
            setShowFailNotification(true);
        })
    }

    useEffect(() => {
        if (isAuthenticated === null) {
            const isLoggedIn = isUserLoggedIn();
            if (isLoggedIn) {
                retrieve_session_user(new Cookies().get(auth_token_cookie_name))
                    .then(su => {
                        const applicantData: Applicant = su.data;
                        if (applicantData.isApplicant) {
                            setApplicant(applicantData);
                            const job_application: JobApplication = { applicant_id: applicantData.applicant_id, job_id: Number(job_id) };
                            candidate_has_applied_to_job(job_application).then(s => {
                                setHasApplied(s.data.hasApplied);
                            }).catch(() => {
                                //Nothing if fail
                            })
                        }
                    });
            }
            setIsAuthenticated(isLoggedIn);
        }
    }, [isAuthenticated, job_id]);

    return { 
        showSuccessNotification,
        showFailNotification,
        handleApply, 
        setShowSuccessNotification,
        setShowFailNotification,
        hasApplied,
    }
}