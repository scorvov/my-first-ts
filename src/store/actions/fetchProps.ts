import {Action, Dispatch} from "redux";
import {IProp} from "../models/iProp";
import {ILoadedErrorAction} from "./fetchProducts";
import {CarstoreService} from "../../services/carstore-service";

const carstoreService = new CarstoreService();

export interface ILoadedPropsAction extends Action {
    payload: any;
}

export const FETCH_PROPS_SUCCESS = "FETCH_PROPS_SUCCESS";
export const FETCH_PROPS_REQUEST = "FETCH_PROPS_REQUEST";
export const FETCH_PROPS_FAILURE = "FETCH_PROPS_FAILURE";

export const propsLoaded = (propsList: IProp[]): ILoadedPropsAction =>
    ({
        payload: propsList,
        type: FETCH_PROPS_SUCCESS,
    });
export const propsRequested = ():Action => {
    return {
        type: FETCH_PROPS_REQUEST
    };
};
export const propsError = (error:string): ILoadedErrorAction => {
    return {
        payload: error,
        type: FETCH_PROPS_FAILURE
    };
};
export const fetchProps = ():any => {
    return (dispatch:any) => {
        dispatch(propsRequested());
        carstoreService.getProps()
            .then((data:any) => dispatch(propsLoaded(data)))
            .catch((err) => dispatch(propsError(err)));
    }
};

export const propDelete = (id:number) => {
    return (dispatch:Dispatch) => {
        carstoreService.deleteProp(id)
            .then(((response:any) => {
                if(response.ok) {
                    dispatch(fetchProps());
                }
            }));
    }
};

export const propCreate = (paramsForCreateProp: IProp):any => {
    return (dispatch:Dispatch) => {
        carstoreService.createProp(paramsForCreateProp)
            .then(((response:any) => {
                if(response.ok) {
                    dispatch(fetchProps());
                }
            }));
    }
};


