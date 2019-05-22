import * as React from "react";
import './app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../pages/login-page";
import {MainPage} from "../pages/main-page";
import {CreateProduct} from "../pages/create-product";
import {CreateProperty} from "../pages/create-property";

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
                    exact
                    path="/login"
                    render={() => (
                        <LoginPage
                            isLoggedIn={isLoggedIn}
                            onLogin={this.onLogin}/>
                    )} />
                <Route
                    exact
                    path="/product/create"
                    render={() => (
                        <CreateProduct isLoggedIn={isLoggedIn} />
                    )} />
                <Route
                    exact
                    path="/property/create"
                    render={() => (
                        <CreateProperty isLoggedIn={isLoggedIn} />
                    )} />
                <Route
                    strict
                    path="/"
                    render={() => (
                        <MainPage isLoggedIn={isLoggedIn} />
                    )}/>
            </Switch>
        </div>
    );
};
}

