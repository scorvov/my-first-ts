import {IDataState} from "../reducers/data-reducer";
import {IFetchingState} from "../reducers/fetching-reducer";
import {IAuthState} from "../reducers/auth-reducer";
import {IToastState} from "./IToastState";
import {IAppState} from "../reducers/app-reducer";

export interface IMapState {
    appState:IAppState;
    dataState:IDataState;
    fetchState: IFetchingState;
    authState: IAuthState;
    toastState: IToastState
}
