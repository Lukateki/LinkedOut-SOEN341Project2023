import axios from "axios";
import Cookies from "universal-cookie";
import { JobApplication } from "./main/pages/JobDetailsPage/Types";

//const auth = { username: "admin", password: "Password" };
const rootAPI = "http://127.0.0.1:8000"; 
const api = "http://127.0.0.1:8000/api/v1";

export const auth_token_cookie_name = "auth-token";

/*
const dummyGETRequest = async () => {
    //The params property has to be an object with the params needed for the request
    axios.get(api + '/api-route', { params: {}})
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
            //handle error
        }).then(() => {
            //Add an extra then if some code needs to run no matter what
        });
}

const dummyPOSTRequest = async () => {
    const obj = {};//This object has all the necessary parameters, you include the properties
    axios.post(api + '/api-route', obj)
    .then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
        //handle error
    }).then(() => {
        //Add an extra then if some code needs to run no matter what
    });
}
*/

export const candidate_login = async (username: string, password: string) => {
    return axios.post(rootAPI + "/api-token-auth/", { username: username, password: password });
}

export const get_all_jobs = async () => {
    return axios.get(api + '/jobs/v1/get_all_jobs');
}

//for the applicant/student/candidate registration
export const register_applicant = async (username:string) => {
    return axios.post(api + "/applicants/", {
        username: username,
        skills: undefined, 
        interests: undefined, 
        resume: undefined
    })
}

export const register_user = async (first_name: string, last_name: string, email: string, password: string) => {
    return axios.post(api + "/users/", {
        first_name: first_name, 
        last_name: last_name, 
        email: email,  
        password: password,
        username: email
    })
}

export const update_applicant = async (id: number, user_id: number) => {
    return axios.patch(api + `/applicants/${id}/`, {user: user_id})
}

//for the recruiters/employer registration
export const register_recruiter = async (company: string, headquarters: string, username: string) => {
    return axios.post(api + "/recruiters/", {
        company: company, 
        about: undefined, 
        headquarters: headquarters,
        username: username
    })
}

export const update_recruiter = async (id: number, user_id: number) => {
    return axios.patch(api + `/recruiters/${id}/`, {user: user_id})
}

export const upload_job = async (title: string, recruiter: number, posting_url: string, posting_date: string, expiry_date: string, city: string, job_type: string, description: string ) => {
    const token = new Cookies().get(auth_token_cookie_name)
    return axios.post(api + "/jobs/", {
        title: title, 
        recruiter: recruiter, 
        posting_url: posting_url, 
        posting_date: posting_date,
        expiry_date: expiry_date,
        city: city,
        job_type: job_type, 
        description: description
    }, { headers: { "Authorization" : `Token ${token}`}})
}

export const get_recruiter = async () =>{
    return axios.get(api + '/recruiters');
}

export const retrieve_session_user = async (token: string) => {
    return axios.get(api + "/users/api/retrieve_session_user/", { headers: {"Authorization" : `Bearer ${token}`}})
}

export const send_email = async (firstName: string, lastName: string, subject: string, company: string, email: string, message: string) => {
    return axios.get(rootAPI + "/send-email", {params: {
        'firstname': firstName,
        'lastname' : lastName,
        'subject' : subject,
        'company' : company,
        'email' : email,
        'message' : message
    }})
}

export const retrieve_recruiter = async (token:string) => {
    return axios.get(api +"/recruiters/api/retrieve_recruiter/", {headers: {"Authorization" : `Bearer ${token}`}})
}
export const retrieve_job_applications = async (jobID: string) => {
    return axios.get(api + `/applications/api/get_applicants/`, { params: { job_id: jobID }});
}

export const retrieve_job_details = async (jobID: string) => {
    return axios.get(api + `/jobs/${jobID}/`);
}

export const get_job_recruiter = async (recruiter_id: string) => {
    return axios.get(api + `/recruiters/${recruiter_id}`);
}

export const update_recruiter_about = async (id: number, about: string) => {
    return axios.patch(api + `/recruiters/${id}/`, {about: about})
}

export const update_recruiter_summary = async (id: number, summary) => {
    return axios.patch(api + `/recruiters/${id}/`, summary)
}

export const update_user_summary = async (id: number, summary) => {
    return axios.patch(api + `/users/${id}/`, summary)
}

export const update_applicant_summary = async (id: number, summary) => {
    return axios.patch(api + `/applicants/${id}/`, summary)
}

export const update_applicant_description = async (id: number, description) => {
    return axios.patch(api + `/applicants/${id}/`, {"description": description})
}

export const retrieve_applicant_experience = async (applicantID: string) => {
    return axios.get(api + `/applicants/api/get_experiences/`, { params: { applicant_id: applicantID }});
}

export const update_experience = async (id: number, experience) => {
    return axios.patch(api + `/experiences/${id}/`, experience)
}

export const create_experience = async (experience) => {
    return axios.post(api + `/experiences/`, experience)
}

export const delete_experience = async (id: number) => {
    return axios.delete(api + `/experiences/${id}/`);
}

export const retrieve_applicant_education = async (applicantID: string) => {
    return axios.get(api + `/applicants/api/get_educations/`, { params: { applicant_id: applicantID }});
}

export const update_education = async (id: number, education) => {
    return axios.patch(api + `/educations/${id}/`, education)
}

export const create_education = async (education) => {
    return axios.post(api + `/educations/`, education)
}

export const delete_education = async (id: number) => {
    return axios.delete(api + `/educations/${id}/`);
}

export const retrieve_recruiter_jobs = async (recruiterID: string) => {
    return axios.get(api + `/recruiters/api/get_jobs/`, { params: { recruiter_id: recruiterID }});
}

export const create_job_application = async (job_application: JobApplication) => {
    return axios.post(api + `/applications/`, { applicant: job_application.applicant_id, job: job_application.job_id });
}

export const candidate_has_applied_to_job = async (job_application: JobApplication) => {
    return axios.get(api + `/applications/api/has_applied`, { params: {...job_application}});
}

export const update_application_status = async (application_id: number, application_accepted: boolean | undefined) => {
    return axios.patch(api + `/applications/${application_id}/`, {application_accepted})
}

export const delete_applications = (job_id: number) => {
    return axios.get(api + `/applications/api/delete_applications/`, {params: { job_id: job_id}})
}

export const update_jobs = async (id: number, jobs) => {
    return axios.patch(api + `/jobs/${id}/`, jobs)
}

export const delete_job = async (id: number) => {
    return axios.delete(api + `/jobs/${id}/`);
}

export const search_jobs = async (searchTerm: string) => {
    return axios.get(api + `/jobs/`, { params: { search: searchTerm }});
}