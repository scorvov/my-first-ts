import * as React from "react";
import {Route, Switch} from "react-router";
import MainPage from "../main-page";
import {CreateUpdateProductContainer} from "../create-update-product/container";
import {CreatePropContainer} from "../create-prop/container";
import {ProductContainer} from "../product/container";
import {LoginContainer} from "../login/container";
import {Toaster} from "../common/notistack/toaster";
import {connect} from "react-redux";
import {initializeApp} from "../../store/actions/app-actions";
import {IMapState} from "../../store/models/iState";
import {IAppState} from "../../store/reducers/app-reducer";
import {Spinner} from "../common/spinner";
import "./../../assests/styles/app.scss";

interface IAppProps {
    initializeApp: () => void;
}

class App extends React.Component<IAppProps & IAppState> {
    componentDidMount(): void {
        this.props.initializeApp();
    }

    render() {
        console.log(this.props);
        if (!this.props.initialized) return <Spinner/>;

        return (<>
                <Switch>
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
                        exact path="/login"
                        component={LoginContainer}/>
                    <Route
                        path="/"
                        component={MainPage}/>
                </Switch>
                <Toaster/>
            </>
        );
    }
}

const mapStateToProps = ({appState}: IMapState): IAppState => {
    const {initialized} = appState;
    return {initialized}
};

export default connect(mapStateToProps, {initializeApp})(App);


