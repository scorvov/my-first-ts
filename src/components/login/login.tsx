import * as React from "react";
import {MyEnhancedLoginView} from "./with-formik-login";
import {Redirect} from "react-router";

export class Login extends React.Component<any> {

    render() {
        return (!this.props.isAuth) ?
            <MyEnhancedLoginView  getAuthUserData = {this.props.getAuthUserData} />
            : <Redirect to={"/products"} />
    }
}