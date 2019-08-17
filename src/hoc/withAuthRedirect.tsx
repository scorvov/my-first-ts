import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {IMapState} from "../store/models/iState";
import {IAuthState} from "../store/reducers/auth-reducer";

const mapStateToPropsForRedirect = ({authState}: IMapState): IAuthState => {
    const {isAuth} = authState;
    return {isAuth}
};

export const withRouteRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>;
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);

};


