import { testRequest } from "../../../axiosconfig";

export const useLogin = () => {
    const handleLoginBtnClick = () => {
        testRequest();
    }

    return { handleLoginBtnClick };
}