import * as React from "react";
import {Route, Switch, RouteComponentProps} from "react-router";
import {ProductsListContainer} from "./products-list/container";
import {PropsListContainer} from "./props-list/container";
import {withRouteRedirect} from "../hoc/withAuthRedirect";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MainPage: React.FC<RouteComponentProps> = (props) => {

    const {pathname} = props.history.location;
    if(pathname === '/') props.history.push('/products');
    const [value, setValue] = React.useState(pathname !== '/' ? pathname : '/products');

    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
        props.history.push(newValue);
    }

    return (
        <>
            <div className={"nav"}>
                <Tabs className="tabs"
                      value={value}
                      onChange={handleChange}
                >
                    <Tab label="Листинг товаров"
                         value={"/products"}
                         className="tab"
                    />
                    <Tab label="Листинг проперти"
                         value={"/properties"}
                         className="tab"
                    />
                </Tabs>
            </div>
            <div className={"content"}>
                <Switch>
                    <Route exact path="/products" component={ProductsListContainer}/>
                    <Route exact path="/properties" component={PropsListContainer}/>
                </Switch>
            </div>
        </>
    );
};

export default withRouteRedirect(MainPage);
