import * as React from "react";
import {Redirect} from "react-router";


export type TProps = {
    isLoggedIn: boolean
}

export const CreateProp: React.FC<TProps> = (props) => {
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
