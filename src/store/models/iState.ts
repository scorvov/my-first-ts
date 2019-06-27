import {IProductsFetchingState} from "../reducers/dataReducer";
import {IFetchingState} from "../reducers/fetchingReducer";

export interface IMapState {
    dataState:IProductsFetchingState;
    fetchState: IFetchingState;
}
