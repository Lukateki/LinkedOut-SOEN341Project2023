const axios = require(`axios`);
const api = "http://127.0.0.1:8000/api/v1";
//Example of how to do request

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
export const testRequest = async () => {
    const params = {
        username: "admin",
        password: "Password"
    };

    axios.get(api + "/jobs", params)
        .then(result => console.log(result))
        .catch(error => console.log(error))
}