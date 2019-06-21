import * as React from "react";
import '../../assests/app.scss';
import {Route, Switch} from "react-router";
import {LoginPage} from "../pages/login-page";
import {MainPage} from "../pages/main-page";
import {CreateProduct} from "../pages/create-product";
import {CreateProp} from "../pages/create-prop";
import Product from "../pages/product";
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/fetchProducts";
import {fetchProps} from "../../store/actions/fetchProps";

// type State = {
//     isLoggedIn ?: boolean
// };

export class App extends React.Component<any> {

    componentDidMount() {
        this.props.fetchProps();
        this.props.fetchProducts();
    }

    state = {
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    render() {
        const {isLoggedIn} = this.state;
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact path="/login"
                        render={() => (
                            <LoginPage
                                isLoggedIn={isLoggedIn}
                                onLogin={this.onLogin}/>
                        )}/>
                    <Route
                        exact path="/product/create"
                        render={() => (
                            <CreateProduct isLoggedIn={isLoggedIn}/>
                        )}/>
                    <Route
                        exact path="/prop/create"
                        render={() => (
                            <CreateProp isLoggedIn={isLoggedIn}/>
                        )}/>
                    {/*<Route
                    exact path="/prop/update"
                    render={() => (
                        <UpdateProp isLoggedIn={isLoggedIn} />
                    )} />*/}
                    <Route path="/product/:id"
                           render={() => (
                               <Product isLoggedIn={isLoggedIn}/>
                           )}/>
                    <Route
                        path="/"
                        render={() => (
                            <MainPage isLoggedIn={isLoggedIn}/>
                        )}/>
                </Switch>
            </div>
        );
    };
}

export default connect(null, {fetchProducts, fetchProps})(App);

