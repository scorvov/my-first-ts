import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {ErrorBoundry} from "./components/common/error-boundry";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./store/reducers";
import {App} from "./components/app";
import { SnackbarProvider } from "notistack";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <SnackbarProvider>
                    <App/>
                </SnackbarProvider>
            </Router>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));

