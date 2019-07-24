import {IDataState} from "../reducers/data-reducer";
import {IFetchingState} from "../reducers/fetching-reducer";
import {IAuthState} from "../reducers/auth-reducer";
import {IToastState} from "./IToastState";

export interface IMapState {
    dataState:IDataState;
    fetchState: IFetchingState;
    authState: IAuthState;
    toastState: IToastState
}
