import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {upload_job, retrieve_session_user } from "../../../axiosconfig";
import { auth_token_cookie_name } from "../../../axiosconfig"
import Cookies from "universal-cookie";




export const useUploadJob = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Full-time");
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [expiry, setExpiry] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorType, setErrorType] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorExpiry, setErrorExpiry] = useState(false);
    const [errorCity, setErrorCity] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorUrl, setErrorUrl] = useState(false);

    const handleTitleChange = (inputTitle: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorTitle(false);
        setTitle(inputTitle.target.value);
    }

    const handleTypeChange = (inputType: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorType(false);
        setType(inputType.target.value);
    }

    const handleCityChange = (inputCity: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorCity(false);
        setCity(inputCity.target.value);
    }

    const handleDateChange = (inputDate: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorDate(false);
        setDate(inputDate.target.value);
    }

    const handleExpiryChange = (inputExpiry: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorExpiry(false);
        setExpiry(inputExpiry.target.value);
    }

    const handleDescriptionChange = (inputDescription: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorDescription(false);
        setDescription(inputDescription.target.value);
    }

    const handleUrlChange = (inputUrl: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorUrl(false);
        setUrl(inputUrl.target.value);
    }

    const navigate = useNavigate();

    const handleUploadJobBtnClick = async () => {

        if(title === ""){
            setErrorTitle(true)
        }

        if(type === ''){
            setErrorType(true)
        }

        if(city === ''){
            setErrorCity(true)
        }

        if(date === ''){
            setErrorDate(true)
        }

        if(expiry === ''){
            setErrorExpiry(true)
        }

        if(description === ''){
            setErrorDescription(true)
        }
        
        if(url === ''){
            setErrorUrl(true)
        }

        const token = new Cookies().get(auth_token_cookie_name)
        const response = await retrieve_session_user(token);
        const recruiterNew = response.data.id;
        if(!errorTitle && !errorType && !errorCity && !errorDate && !errorExpiry && !errorDescription && !errorUrl){
           uploadIt(recruiterNew);
       
        }

    }

    const uploadIt = async(recruiterNew) => {
            await upload_job(title, recruiterNew, url, date, expiry, city, type, description).then(result => {
                navigate("/")
            }).catch();
    }

    return {errorUrl, errorType,errorTitle,errorExpiry,errorDescription,errorDate,errorCity,handleUploadJobBtnClick, handleTitleChange, handleTypeChange, handleCityChange, handleDateChange, handleExpiryChange, handleDescriptionChange, handleUrlChange, title, type, city, date, expiry ,description, url}

}