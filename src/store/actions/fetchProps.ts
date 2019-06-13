import { Action } from "redux";
import {IProp} from "../models/iProp";
import {ILoadedErrorAction} from "./fetchProducts";
import {ICreatePropValues} from "../../components/pages/create-prop";

export interface ILoadedPropsAction extends Action {
    payload: any;
}
export interface IDeletePropAction extends Action {
    payload: number;
}
export interface ICreatePropAction extends Action {
    payload: ICreatePropValues
}
export const FETCH_PROPS_SUCCESS = "FETCH_PROPS_SUCCESS";
export const FETCH_PROPS_REQUEST = "FETCH_PROPS_REQUEST";
export const FETCH_PROPS_FAILURE = "FETCH_PROPS_FAILURE";
export const PROP_DELETED = "PROP_DELETED";
export const PROP_CREATED = "PROP_CREATED";

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
export const propDeleted = (id: number): IDeletePropAction =>
    ({
        payload: id,
        type: PROP_DELETED
    });
export const propCreated = (values:ICreatePropValues): ICreatePropAction =>
    ({
        payload: values,
        type: PROP_CREATED
    });


