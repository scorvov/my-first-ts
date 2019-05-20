import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
    isLoggedIn: boolean,
    onLogin: () => void
}

export const LoginPage: React.FC<Props> = (props) => {
    const {isLoggedIn, onLogin} = props;

    if (isLoggedIn) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="jumbotron">
            <p>Login to see secret page!</p>
            <button
                className="btn btn-primary"
                onClick={onLogin}
            >
                Login
            </button>
        </div>
    );
};

