import {isAuth} from "./auth-actions";
import {INITIALIZED_SUCCESS} from "../constants";
import { enqueueSnackbar } from "./toast-actions";


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(isAuth());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
        .catch(() => {
            dispatch(initializedSuccess());
            dispatch(enqueueSnackbar({
                message: "Внутренняя ошибка, не удалось установить соединение!",
                variant: "error"
            }));
        })
};