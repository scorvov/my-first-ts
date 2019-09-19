import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import {OptionsObject, withSnackbar} from 'notistack';
import {IMapState} from "../../store/models/iState";
import {INotification, IToastState} from "../../store/models/IToastState";
import {removeSnackbar} from 'store/actions/toast-actions';
import IconButton from "@material-ui/core/IconButton";

interface INotifierDispatchProps {
    removeSnackbar: (key: number) => void;
    enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => OptionsObject['key'] | null;
    closeSnackbar: (key?: OptionsObject['key']) => void;
}

class Notifier extends React.Component<IToastState & INotifierDispatchProps> {

    componentDidUpdate() {
        const {notifications, removeSnackbar, enqueueSnackbar, closeSnackbar} = this.props;

        notifications.forEach(({key, message, variant}: INotification) => {
            enqueueSnackbar(
                message, {
                    variant,
                    autoHideDuration: 2500,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    action: (key: number) => (
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={() => closeSnackbar(key)} >
                            <CloseIcon style={{fontSize: 15}}/>
                        </IconButton>
                    )
                });
            if(key) removeSnackbar(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = ({toastState}: IMapState): IToastState => {
    const {notifications} = toastState;
    return {notifications};
};

export const Toaster = (connect(mapStateToProps, {removeSnackbar})(withSnackbar(Notifier)));
