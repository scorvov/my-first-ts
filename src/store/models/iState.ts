import {IDataState} from "../reducers/data-reducer";
import {IFetchingState} from "../reducers/fetching-reducer";
import {IAuthState} from "../reducers/auth-reducer";

export interface IMapState {
    dataState:IDataState;
    fetchState: IFetchingState;
    authState: IAuthState;
}
