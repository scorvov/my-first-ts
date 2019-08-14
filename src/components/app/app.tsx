import * as React from "react";
import {Route, Switch, withRouter} from "react-router";
import MainPage from "../main-page";
import {CreateUpdateProductContainer} from "../create-update-product/container";
import {CreatePropContainer} from "../create-prop/container";
import {ProductContainer} from "../product/container";
import {LoginContainer} from "../login/container";
import {Toaster} from "../common/notistack/toaster";
import "./../../assests/styles/app.scss";
import {connect} from "react-redux";
import {isAuth} from "../../store/actions/auth-actions";

class App extends React.Component<any> {
    componentDidMount(): void {
        this.props.isAuth();
        // this.props.history.push('products');
    }

    render() {

        return (<>
                <Switch>
                    <Route
                        exact path="/login"
                        component={LoginContainer}/>
                    <Route
                        exact path="/product/create"
                        component={CreateUpdateProductContainer}/>
                    <Route
                        exact path="/product/update/:id"
                        component={CreateUpdateProductContainer}/>
                    <Route
                        exact path="/prop/create"
                        component={CreatePropContainer}/>
                    <Route
                        path="/product/:id"
                        component={ProductContainer}/>
                    <Route
                        path="/products"
                        component={MainPage}/>
                    <Route
                        path="/properties"
                        component={MainPage}/>
                </Switch>
                <Toaster/>
            </>
        );
    }
}

export default connect(null, {isAuth})(withRouter(App))


