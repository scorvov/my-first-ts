import {connect} from "react-redux";
import {getAuthUserData} from "../../store/actions/auth-actions";
import {Login} from "./login";
import {IMapState} from "../../store/models/iState";
import {IPrivateRouteProps} from "../../hoc/withAuthRedirect";


const mapStateToProps = ({authState}: IMapState): IPrivateRouteProps => {
    const {isAuth} = authState;
    return {isAuth}
};

export const LoginContainer = connect(mapStateToProps,
    {getAuthUserData})(Login);
