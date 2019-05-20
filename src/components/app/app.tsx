import * as React from "react";
import './app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../pages/login-page";
import {MainPage} from "../pages/main-page";


// type State = {
//     isLoggedIn ?: boolean
// };

export class App extends React.Component  {

    state = {
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };
render () {
    const {isLoggedIn} = this.state;
    return (
        <div className="app">
            <Switch>
                <Route
                    path="/login"
                    render={() => (
                        <LoginPage
                            isLoggedIn={isLoggedIn}
                            onLogin={this.onLogin}/>
                    )}/>
                <Route
                    path="/"
                    render={() => (
                        <MainPage
                            isLoggedIn={isLoggedIn}
                            />
                    )}/>
            </Switch>
        </div>
    );
};
}

