import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {IMapState} from "../store/models/iState";

const mapStateToPropsForRedirect = ({authState}: IMapState): IPrivateRouteProps => {
    const {isAuth} = authState;
    return {isAuth}
};

export interface IPrivateRouteProps {
    isAuth: boolean;
}

export const withRouteRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>;
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);

};


