import * as React from "react";
import {Redirect} from "react-router";


type Props = {
    isLoggedIn: boolean
}

export const CreateProduct: React.FC<Props> = (props) => {
    const {isLoggedIn} = props;
    if(isLoggedIn) {
        return (
            <>
                <div>Добавить товар</div>
            </>
        );
    }
    return <Redirect to="/login" />;
};
