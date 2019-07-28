import * as React from "react";
import {Route, Switch} from "react-router";
import MainPage from "../main-page";
import {CreateUpdateProductContainer} from "../create-update-product/container";
import {CreatePropContainer} from "../create-prop/container";
import {ProductContainer} from "../product/container";
import {LoginContainer} from "../login/container";
import {Toaster} from "../common/notistack/toaster";
import "./../../assests/styles/app.scss";

export const App: React.FC = () => {

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
};

