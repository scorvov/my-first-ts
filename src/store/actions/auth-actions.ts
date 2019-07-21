import {Dispatch} from "redux";
import {baseURL, SET_USER_DATA} from "../constants";

export const setAuthUserData = (isAuth:boolean) => ({type: SET_USER_DATA, payload: isAuth});
export const getAuthUserData = (authData:any) => {
    return (dispatch: Dispatch) => {
        fetch(baseURL + "auth", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify(authData)
        })
            .then((response) => authResponse(response, dispatch))
            .catch(() => {
                dispatch(setAuthUserData(false));
            })
    }
};

export const authResponse = (response: any, dispatch:any) => {
    if (response.status === 200) {
        dispatch(setAuthUserData(true))
    }
    if (response.status === 401){
        dispatch(setAuthUserData(false));
    }
    return response;
};