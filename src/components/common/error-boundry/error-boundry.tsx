import * as React from 'react';
import './error-boundry.scss';
import {ErrorIndicator} from "../error-indicator";

type Props = {
    // label: string;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundry extends React.Component<Props, State> {

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return this.props.children;
    }
}
