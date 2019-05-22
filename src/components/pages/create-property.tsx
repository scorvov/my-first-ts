import * as React from "react";
import {Redirect} from "react-router";


type Props = {
    isLoggedIn: boolean
}

export const CreateProperty: React.FC<Props> = (props) => {
    const {isLoggedIn} = props;
    if(isLoggedIn) {
        return (
            <>
                <div>Добавить свойство</div>
            </>
        );
    }
    return <Redirect to="/login" />;
};
