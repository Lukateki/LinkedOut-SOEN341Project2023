import axios from "axios";

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
    return axios.get(api + '/jobs');
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

export const get_user = async (token: string) => {
    //The params property has to be an object with the params needed for the request
    axios.get(api + '/users', { params: {}})
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
            //handle error
        }).then(() => {
            //Add an extra then if some code needs to run no matter what
        });
}
export const register_user = async (first_name: string, last_name: string, email: string, password: string) => {
    return axios.post(api + "/users/", {
        first_name: first_name, 
        last_name: last_name, 
        email: email,  
        password: password
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
