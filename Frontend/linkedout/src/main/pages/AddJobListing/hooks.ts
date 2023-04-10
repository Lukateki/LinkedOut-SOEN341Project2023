import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {upload_job, retrieve_session_user } from "../../../axiosconfig";
import { auth_token_cookie_name } from "../../../axiosconfig"
import Cookies from "universal-cookie";
import { getCurrentDate } from "./types";

export const useUploadJob = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Full-time");
    const [city, setCity] = useState("");
    const [date] = useState(getCurrentDate());
    const [expiry, setExpiry] = useState(getCurrentDate());
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const [errorTitle, setErrorTitle] = useState(true);
    const [errorExpiry, setErrorExpiry] = useState(false);
    const [errorCity, setErrorCity] = useState(true);
    const [errorDescription, setErrorDescription] = useState(true);
    const [errorUrl, setErrorUrl] = useState(true);

    const handleTitleChange = (inputTitle: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorTitle(inputTitle.target.value.length === 0);
        setTitle(inputTitle.target.value);
    }

    const handleTypeChange = (inputType: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setType(inputType.target.value);
    }

    const handleCityChange = (inputCity: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorCity(inputCity.target.value.length === 0);
        setCity(inputCity.target.value);
    }

    const handleExpiryChange = (inputExpiry: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isExpiryDateValid = new Date(inputExpiry.target.value).getTime() > new Date(date).getTime();
        setErrorExpiry(!isExpiryDateValid);
        setExpiry(inputExpiry.target.value);
    }

    const handleDescriptionChange = (inputDescription: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorDescription(inputDescription.target.value.length === 0);
        setDescription(inputDescription.target.value);
    }

    const handleUrlChange = (inputUrl: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorUrl(inputUrl.target.value.length === 0);
        setUrl(inputUrl.target.value);
    }

    const navigate = useNavigate();

    const handleUploadJobBtnClick = async () => {
        const token = new Cookies().get(auth_token_cookie_name)
        const response = await retrieve_session_user(token);
        const recruiterNew = response.data.recruiter_id;
        if(!errorTitle && !errorCity && !errorExpiry && !errorDescription && !errorUrl){
           uploadIt(recruiterNew);
        }

    }

    const uploadIt = async (recruiterNew) => {
            await upload_job(title, recruiterNew, url, date, expiry, city, type, description).then(result => {
                navigate("/")
            }).catch();
    }

    return {errorUrl, errorTitle, errorExpiry, errorDescription, errorCity, handleUploadJobBtnClick, handleTitleChange, handleTypeChange, handleCityChange, handleExpiryChange, handleDescriptionChange, handleUrlChange, title, type, city, date, expiry, description, url }

}