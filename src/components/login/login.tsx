import * as React from "react";
import {IPropLogin, MyEnhancedLoginView} from "./with-formik-login";
import {Redirect} from "react-router";
import {IAuthState} from "../../store/reducers/auth-reducer";

export class Login extends React.Component<IAuthState&IPropLogin> {

    render() {
        return (!this.props.isAuth) ?
            <MyEnhancedLoginView  getAuthUserData = {this.props.getAuthUserData} />
            : <Redirect to={"/products"} />
    }
}