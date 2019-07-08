import * as React from "react";
import '../../assests/styles/app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../login-page";
import {MainPage} from "../main-page";
import {CreateUpdateProductContainer} from "../create-update-product/container";
import {CreatePropContainer} from "../create-prop/container";
import {ProductContainer} from "../product/container";
import {connect} from "react-redux";
import {fetchData} from "../../store/actions/fetchingActions";


class App extends React.Component {

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact path = "/login"
                        component = {LoginPage} />
                    <Route
                        exact path = "/product/create"
                        component = {CreateUpdateProductContainer} />
                    <Route
                        exact path = "/product/update/:id"
                        component = {CreateUpdateProductContainer} />
                    <Route
                        exact path = "/prop/create"
                        component = {CreatePropContainer}/>
                    <Route path = "/product/:id"
                           component = {ProductContainer}/>
                    <Route
                        path = "/"
                        component = {MainPage}/>
                </Switch>
            </div>
        );
    };
}

export default connect(null, {fetchData})(App);

