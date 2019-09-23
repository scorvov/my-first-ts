import {baseURL, SET_USER_DATA} from "../constants";
import {enqueueSnackbar} from "./toast-actions";
import {fetchRequest} from "./fetch-request";
import {fetchError} from "./fetching-actions";
import {Action, Dispatch} from "redux";

export interface ISetAuthUserData extends Action {
    payload: boolean;
}

export const setAuthUserData = (isAuth: boolean):ISetAuthUserData => ({type: SET_USER_DATA, payload: isAuth});

export const authResponse = (response: Response):any => (dispatch: Dispatch) => {
    if (response.status === 200) {
        dispatch(setAuthUserData(true));
    }
    if (response.status === 401) {
        dispatch(setAuthUserData(false));
/*        dispatch(enqueueSnackbar({
            message: "Вы не авторизованы!",
            variant: "warning"
        }));*/
    }
    return response;
};

export const isAuth = ():any => (dispatch: Dispatch) => {
    return fetch(baseURL, {credentials: "include"})
        .then((response) => {
            dispatch(authResponse(response));
        });
};

export const authorization = (authData: any) => (dispatch: any) => {
    fetchRequest("POST", "auth", authData)
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


