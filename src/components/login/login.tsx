import * as React from "react";
import {IPropLogin, MyEnhancedLoginView} from "./with-formik-login";
import {Redirect} from "react-router";
import {IAuthState} from "../../store/reducers/auth-reducer";

export const Login: React.FC<IAuthState&IPropLogin> = (props) => {

        return (!props.isAuth) ?
            <MyEnhancedLoginView  getAuthUserData = {props.getAuthUserData} />
            : <Redirect to={"/products"} />
};