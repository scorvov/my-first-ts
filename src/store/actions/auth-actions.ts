import {SET_USER_DATA} from "../constants";
import {fetchRequest} from "./base-actions";

export const authResponse = (response: any, dispatch: any) => {
    if (response.status === 200) {
        dispatch(setAuthUserData(true))
    }
    if (response.status === 401) {
        dispatch(setAuthUserData(false));
    }
    return response;
};

export const setAuthUserData = (isAuth: boolean) => ({type: SET_USER_DATA, payload: isAuth});

export const getAuthUserData = (authData: any) =>
    fetchRequest("POST", "auth", authData);

