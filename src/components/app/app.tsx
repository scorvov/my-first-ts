import * as React from "react";
import '../../assests/app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../pages/login-page";
import {MainPage} from "../pages/main-page";
import {CreateProduct} from "../pages/create-product";
import {CreateProp} from "../pages/create-prop";
import {ProductContainer} from "../pages/product";
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/fetchProducts";
import {fetchProps} from "../../store/actions/fetchProps";
import {UpdateProduct} from "../pages/update-product";

interface IDispatchProps {
    fetchProducts: () => void;
    fetchProps: () => void;
}

class App extends React.Component<IDispatchProps> {

    componentDidMount() {
        this.props.fetchProps();
        this.props.fetchProducts();
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
                           component = {ProductContainer}/>
                    <Route
                        path = "/"
                        component = {MainPage}/>
                </Switch>
            </div>
        );
    };
}

export default connect(null, {fetchProducts, fetchProps})(App);

