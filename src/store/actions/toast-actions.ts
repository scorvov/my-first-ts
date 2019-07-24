import {INotification} from "../models/IToastState";
import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR} from "../constants";

export const enqueueSnackbar = (notification: INotification) => {
    // const key = notification.options && notification.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: new Date().getTime() + Math.random(),
        },
    };
};

export const removeSnackbar = (key: number) => ({
    type: REMOVE_SNACKBAR,
    key,
});