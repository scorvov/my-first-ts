import {INotification} from "../models/IToastState";
import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR} from "../constants";
import {Action} from "redux";

export interface IEnqueueSnackbar extends Action {
    notification?: INotification;
    key?: number;
}

export const enqueueSnackbar = (notification: INotification):IEnqueueSnackbar => {
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: new Date().getTime() + Math.random(),
        },
    };
};

export const removeSnackbar = (key: number):IEnqueueSnackbar => ({
    type: REMOVE_SNACKBAR,
    key,
});
