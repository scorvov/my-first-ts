import * as React from "react";
import '../../assests/app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../pages/login-page";
import {MainPage} from "../pages/main-page";
import {CreateProduct} from "../pages/create-product";
import {CreateProp} from "../pages/create-prop";
import {Product} from "../pages/product";
import {connect} from "react-redux";
import {UpdateProduct} from "../pages/update-product";
import {fetchData} from "../../store/actions/fetchingActions";

export interface IDispatchProps {
    fetchData: () => void;
}

class App extends React.Component<IDispatchProps> {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact path = "/login"
                        component = {LoginPage} />
                    <Route
                        exact path = "/product/create"
                        component = {CreateProduct} />
                    <Route
                        exact path = "/product/update/:id"
                        component = {UpdateProduct} />
                    <Route
                        exact path = "/prop/create"
                        component = {CreateProp}/>
                    <Route path = "/product/:id"
                           component = {Product}/>
                    <Route
                        path = "/"
                        component = {MainPage}/>
                </Switch>
            </div>
        );
    };
}

export default connect(null, {fetchData})(App);

