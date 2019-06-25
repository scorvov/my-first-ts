import * as React from "react";
import {Route, Switch} from "react-router";
import ProductsList from "./products-list";
import PropsList from "./props-list";
import {NavLink} from "react-router-dom";
import "../../assests/main-page.scss";

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
                <Route exact path="/products" component={ProductsList}/>
                <Route exact path="/properties" component={PropsList}/>
            </Switch>
        </div>
    );
};
