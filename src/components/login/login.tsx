import * as React from "react";
import {IPropLogin, MyEnhancedLoginView} from "./with-formik-login";
import {Redirect} from "react-router";
import {IPrivateRouteProps} from "../../hoc/withAuthRedirect";

export class Login extends React.Component<IPrivateRouteProps&IPropLogin> {

    render() {
        return (!this.props.isAuth) ?
            <MyEnhancedLoginView  getAuthUserData = {this.props.getAuthUserData} />
            : <Redirect to={"/products"} />
    }
}