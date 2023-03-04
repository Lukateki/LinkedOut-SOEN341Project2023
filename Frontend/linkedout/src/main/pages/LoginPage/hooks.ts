import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { auth_token_cookie_name, candidate_login } from "../../../axiosconfig";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { isUserLoggedIn } from "./types";

export const useLogin = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState(false);
    const isUserAuthenticated = isUserLoggedIn();
    const navigate = useNavigate();

    const handleUsernameChange = (inputUsername: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(false);
        setLoginUsername(inputUsername.target.value);
    }

    const handlePasswordChange = (inputPassword: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(false);
        setLoginPassword(inputPassword.target.value);
    }

    const handleRegistration = () => {
     navigate("/register");
    }
        

    const handleLoginBtnClick = useCallback(() => {
        candidate_login(loginUsername, loginPassword).then(result => {
            setError(false);
            const tokenCookie = new Cookies();
            tokenCookie.set(auth_token_cookie_name, result.data["token"]);
            navigate("/");
        }).catch(() => {
            setError(true);
        });
    }, [loginUsername, loginPassword, navigate]);

    useEffect(() => {
        if (isUserAuthenticated) {
            navigate("/");
        }
    });

    return { error, loginUsername, loginPassword, handleUsernameChange, handlePasswordChange, handleRegistration, handleLoginBtnClick};
}
