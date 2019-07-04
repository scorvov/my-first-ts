import * as React from "react";
import {Route, Switch} from "react-router";
import {ProductsListContainer} from "./products-list/container";
import {NavLink} from "react-router-dom";
import "../assests/styles/main-page.scss";
import {PropsListContainer} from "./props-list/container";

export const MainPage: React.FC = () => {
    return (
        <div className="app-wrapper">
            <div className="wrapper-header">
                <button>
                    <NavLink to="/products" className="main-header">Листинг товаров</NavLink>
                </button>
                <button>
                    <NavLink to="/properties" className="main-header">Листинг проперти</NavLink>
                </button>
            </div>
            <Switch>
                <Route exact path="/products" component={ProductsListContainer} selected />
                <Route exact path="/properties" component={PropsListContainer}/>
            </Switch>
        </div>
    );
};
