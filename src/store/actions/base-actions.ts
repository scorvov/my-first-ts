import {fetchError, fetchLoaded, fetchRequested, fetchData} from "./fetchingActions";
import {baseURL} from "../constants";
import {authResponse, setAuthUserData} from "./auth-actions";

export const fetchRequest = (method: string, path: string, params?: any) => {
    return (dispatch: any) => {
        console.log(params);
        dispatch(fetchRequested());
        fetch(baseURL + path, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        })
            .then((response) => authResponse(response, dispatch))
            .then((response) => response.json())
            .then((data) => dispatch(fetchLoaded(data)))
            .catch((err) => {
                dispatch(fetchError(err));
                dispatch(setAuthUserData(false));
            })
    }
};

export const actionRequest = (method: string, path: string, fetchParams?: any, params?: any) => {
    return (dispatch: any) => {
        fetch(baseURL + path, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        })
            .then((response) => authResponse(response, dispatch))
            .then(() => {
                if (fetchParams) {
                    const fetchTypeData = path.split('/')[0];
                    dispatch(fetchData(fetchTypeData, fetchParams))
                }
            })
            .catch((err) => {
                dispatch(setAuthUserData(false));
                dispatch(fetchError(err));
            })
    }
};

