import {IMapState} from "../../store/models/iState";
import {IPropsList} from "../../store/models/iProp";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {connect} from "react-redux";
import {propDelete} from "../../store/actions/propsActions";
import {PropsList} from "./props-list";

const mapStateToProps = ({dataState, fetchState}:IMapState):IPropsList&IFetchingState => {
    const {propsList} = dataState;
    const {loading, error} = fetchState;
    return {propsList, loading, error}
};

export const PropsListContainer = connect(mapStateToProps, {propDelete})(PropsList);
