import * as React from "react";
import {Route, Switch} from "react-router";
import {ProductsListContainer} from "./products-list/container";
import "../assests/styles/main-page.scss";
import {PropsListContainer} from "./props-list/container";
import {withRouteRedirect} from "../hoc/withAuthRedirect";
import {Container, AppBar} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MainPage: React.FC<any> = (props) => {
    console.log(props);
    const {pathname} = props.history.location;
    const [value, setValue] = React.useState(pathname);

    function handleChange(event: any, newValue: any) {
        setValue(newValue);
        props.history.push(newValue);
    }
    return (
        <>
            <Container>
                <AppBar className={"app-bar"} style={{boxShadow:"none" }} position="static">
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
                </AppBar>
            </Container>
            <Container className={"content"}>
                <Switch>
                    <Route exact path="/products" component={ProductsListContainer}/>
                    <Route exact path="/properties" component={PropsListContainer}/>
                </Switch>
            </Container>
        </>
    );
};

export default withRouteRedirect(MainPage);
