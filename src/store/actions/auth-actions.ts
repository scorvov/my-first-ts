import {baseURL, SET_USER_DATA} from "../constants";
import {enqueueSnackbar} from "./toast-actions";
import {fetchRequest} from "./fetch-request";
import {fetchError} from "./fetching-actions";

export const authResponse = (response: any) => (dispatch: any) => {
    if (response.status === 200) {
        dispatch(setAuthUserData(true));
    }
    if (response.status === 401) {
        dispatch(setAuthUserData(false));
    }
    return response;
};

export const setAuthUserData = (isAuth: boolean) => ({type: SET_USER_DATA, payload: isAuth});
export const isAuth = () => (dispatch: any) => {
    fetch(baseURL, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
        .then((response) => dispatch(authResponse(response)));
};
export const getAuthUserData = (authData: any) => (dispatch: any) => {
    fetchRequest("POST", "auth", authData)
        .then((response) => dispatch(authResponse(response)))
        .then((response) => {
            if (response.status === 200) {
                dispatch(enqueueSnackbar({
                    message: "Авторизация успешно пройдена !",
                    variant: "success"
                }));
                dispatch(setAuthUserData(true))
            }
            if (response.status === 401) {
                dispatch(enqueueSnackbar({
                    message: "Вы не прошли авторизацию",
                    variant: "error"
                }));
            }
        })
        .catch((err: string) => {
            dispatch(enqueueSnackbar({
                message: "Внутренняя ошибка",
                variant: "error"
            }));
            dispatch(fetchError(err));
        })
};