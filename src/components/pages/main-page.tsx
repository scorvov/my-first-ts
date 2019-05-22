import * as React from "react";
import {Redirect, Route, Switch} from "react-router";
import ProductsList from "./products-list";
import {PropertiesList} from "./properties-list";
import {NavLink} from "react-router-dom";

type Props = {
    isLoggedIn: boolean
}
export const MainPage: React.FC<Props> = (props) => {
    const {isLoggedIn} = props;
    if (isLoggedIn) {
    return (
        <>
            <NavLink to="/products" >Листинг товаров</NavLink>
            <NavLink to="/properties">Листинг проперти</NavLink>
            <Switch>
                <Route exact path="/products" component={ProductsList}/>
                <Route exact path="/properties" component={PropertiesList}/>
            </Switch>
        </>
    );}
    return <Redirect to="/login" />;
};
