import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {upload_job, get_recruiter, get_user, retrieve_session_user } from "../../../axiosconfig";
import { isUserLoggedIn } from "../LoginPage/types";
import { auth_token_cookie_name } from "../../../axiosconfig"
import Cookies from "universal-cookie";




export const useUploadJob = () => {
    const [title, setTitle] = useState("");
    const [recruiter, setRecruiter] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [expiry, setExpiry] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const handleTitleChange = (inputTitle: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setTitle(inputTitle.target.value);
    }

    const handleRecruiterChange = (inputRecruiter: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setRecruiter(inputRecruiter.target.value);
    }

    const handleTypeChange = (inputType: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setType(inputType.target.value);
    }

    const handleCityChange = (inputCity: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setCity(inputCity.target.value);
    }

    const handleDateChange = (inputDate: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setDate(inputDate.target.value);
    }

    const handleExpiryChange = (inputExpiry: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setExpiry(inputExpiry.target.value);
    }

    const handleDescriptionChange = (inputDescription: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setDescription(inputDescription.target.value);
    }

    const handleUrlChange = (inputUrl: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorS1(false);
        setUrl(inputUrl.target.value);
    }

    const navigate = useNavigate();

    const handleUploadJobBtnClick = async () => {
        
            console.log("date posted:"+ date);
            console.log("date expired:"+ expiry);

            const token = new Cookies().get(auth_token_cookie_name)
            const response = await retrieve_session_user(token);
            const recruiterNew = response.data.id;
            console.log("recruiter:"+ recruiterNew);

            await upload_job(title, recruiterNew, url, date, expiry, city, type, description).then(result => {
                navigate("/")
            })         

    }

    return {handleUploadJobBtnClick, handleTitleChange, handleRecruiterChange, handleTypeChange, handleCityChange, handleDateChange, handleExpiryChange, handleDescriptionChange, handleUrlChange, title, recruiter, type, city, date, expiry ,description, url}

}