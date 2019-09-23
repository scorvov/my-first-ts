import * as React from "react";
import {Route, Switch} from "react-router";
import MainPage from "../main-page";
import {CreateUpdateProductContainer} from "../create-update-product/container";
import {CreatePropContainer} from "../create-prop/container";
import {ProductContainer} from "../product/container";
import {LoginContainer} from "../login/container";
import {Toaster} from "../notistack/toaster";
import {connect} from "react-redux";
import {initializeApp} from "../../store/actions/app-actions";
import {IMapState} from "../../store/models/iState";
import {IAppState} from "../../store/reducers/app-reducer";
import {Spinner} from "../common";
import "./../../assests/styles/app.scss";

interface IAppProps {
    initializeApp: () => void;
}

class App extends React.Component<IAppProps & IAppState> {
    componentDidMount(): void {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) return <Spinner/>;
        return (<div>
                <Switch>
                    <Route
                        path="/product/create"
                        component={CreateUpdateProductContainer}/>
                    <Route
                        path="/product/update/:id"
                        component={CreateUpdateProductContainer}/>
                    <Route
                        path="/prop/create"
                        component={CreatePropContainer}/>
                    <Route
                        path="/product/:id"
                        component={ProductContainer}/>
                    <Route
                        path="/login"
                        component={LoginContainer}/>
                    <Route
                        path="/"
                        component={MainPage}/>
                </Switch>
                <Toaster/>
            </div>
        );
    }
}

const mapStateToProps = ({appState}: IMapState): IAppState => {
    const {initialized} = appState;
    return {initialized}
};

export default connect(mapStateToProps, {initializeApp})(App);


