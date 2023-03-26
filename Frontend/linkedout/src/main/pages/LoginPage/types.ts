import Cookies from "universal-cookie"
import { auth_token_cookie_name } from "../../../axiosconfig"

export const isUserLoggedIn = (): boolean => {
    const authToken = new Cookies().get(auth_token_cookie_name);

    if (authToken === undefined || authToken.trim() === '' || authToken.trim().length === 0) {
        return false;
    }
    return true;
}
