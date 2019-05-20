import * as React from "react";
import {Redirect} from "react-router";


type Props = {
    isLoggedIn: boolean
}
export const MainPage: React.FC<Props> = (props) => {
    const {isLoggedIn} = props;
    if (isLoggedIn) {
    return (
        <>
            <div>ProductsList</div>
            <div>PropertiesList</div>
        </>
    );}
    return <Redirect to="/login" />;
};
