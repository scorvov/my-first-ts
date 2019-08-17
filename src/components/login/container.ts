import {connect} from "react-redux";
import {getAuthUserData} from "../../store/actions/auth-actions";
import {Login} from "./login";
import {IMapState} from "../../store/models/iState";
import {IAuthState} from "../../store/reducers/auth-reducer";


const mapStateToProps = ({authState}: IMapState): IAuthState => {
    const {isAuth} = authState;
    return {isAuth}
};

export const LoginContainer = connect(mapStateToProps,
    {getAuthUserData})(Login);
