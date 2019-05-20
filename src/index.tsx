import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import {App} from './components/app';
import { ErrorBoundry } from "./components/common/error-boundry";
import { CarstoreService } from "./services/carstore-service";
import { CarstoreServiceProvider } from "./components/carstore-service-context";

import { store } from "./store";
const carstoreService = new CarstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <CarstoreServiceProvider value={carstoreService}>
                <Router>
                    <App />
                </Router>
            </CarstoreServiceProvider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));

