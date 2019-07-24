import { IToastState} from "../models/IToastState";
import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR} from "../constants";

const initialToastState:IToastState = {
    notifications: [],
};

export const toastReducer = (state:IToastState = initialToastState, action:any) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
            };

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        default:
            return state;
    }
};