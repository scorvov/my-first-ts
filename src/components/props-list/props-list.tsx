import * as React from "react";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IPropsList} from "../../store/models/iProp";
import "../../assests/styles/list.scss"
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {PropsListView} from "./props-list-view";

export interface IDispatchProps {propDelete: (id:number) => void;}

export class PropsList extends React.Component<IPropsList&IDispatchProps&IFetchingState> {
    render() {
        const {propsList, loading, error,propDelete} = this.props;
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <PropsListView
            propDelete={propDelete}
            propsList={propsList} />
    }
}



