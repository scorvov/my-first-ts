import {IMapState} from "../../store/models/iState";
import {IPropsList} from "../../store/models/iProp";
import {IFetchingState} from "../../store/reducers/fetching-reducer";
import {connect} from "react-redux";
import {PropsList} from "./props-list";
import {fetchData} from "../../store/actions/fetching-actions";
import {itemDeleteById} from "../../store/actions/data-actions";

export interface IPropsListStateProps {
    propsList:IPropsList;
}
export type TPropsListStateProps = IPropsListStateProps & IFetchingState

const mapStateToProps = ({dataState, fetchState}:IMapState):TPropsListStateProps => {
    const {propsList} = dataState;
    const {loading, error} = fetchState;
    return {propsList, loading, error}
};

export const PropsListContainer = connect(mapStateToProps,
    {itemDeleteById, fetchData})(PropsList);
