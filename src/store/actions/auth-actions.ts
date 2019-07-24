import {SET_USER_DATA} from "../constants";
import {enqueueSnackbar} from "./toast-actions";
import { fetchRequest } from "./fetch-request";

export const authResponse = (response: any) => (dispatch: any) => {
    if (response.status === 200) {
        dispatch(setAuthUserData(true));
    }
    if (response.status === 401) {
        dispatch(setAuthUserData(false));
        dispatch(enqueueSnackbar({
            message: "Вы не прошли авторизацию",
            variant: "error"
        }));
    }
    return response;
};

export const setAuthUserData = (isAuth: boolean) => ({type: SET_USER_DATA, payload: isAuth});

export const getAuthUserData = (authData: any) => (dispatch: any) => {
    fetchRequest("POST", "auth", authData)
        .then((response) => dispatch(authResponse(response)))
        .then(dispatch(enqueueSnackbar({
            message: "Авторизация успешно пройдена !",
            variant: "success"
        })))
};