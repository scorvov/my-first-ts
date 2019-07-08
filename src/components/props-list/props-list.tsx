import * as React from "react";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IPropsList} from "../../store/models/iProp";
import "../../assests/styles/list.scss"
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {PropsListView} from "./props-list-view";
import {IFetchData} from "../products-list/products-list";

export interface IPropDelete {propDelete: (id:number) => void;}


export class PropsList extends React.Component<IPropsList & IPropDelete & IFetchData& IFetchingState> {

    componentDidMount(): void {
        this.props.fetchData('props');
    }

    render() {
        const {propsList, loading, error,propDelete} = this.props;
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <PropsListView
            propDelete={propDelete}
            propsList={propsList} />
    }
}



