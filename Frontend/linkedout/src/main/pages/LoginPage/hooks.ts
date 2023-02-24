import { testRequest } from "../../../axiosconfig";

export const useLogin = () => {
    const handleLoginBtnClick = () => {
        //testRequest();
        alert("WORKS")
    }

    return { handleLoginBtnClick };
}