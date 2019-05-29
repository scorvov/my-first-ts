import { Action } from "redux";
import {IProp} from "../models/iProp";
import {IErrorLoaded} from "./fetchProducts";

export interface IPropsLoaded extends Action {
    payload: any;
}
export interface IDeleteProp extends Action {
    payload: number;
}
export const FETCH_PROPS_SUCCESS = "FETCH_PROPS_SUCCESS";
export const FETCH_PROPS_REQUEST = "FETCH_PROPS_REQUEST";
export const FETCH_PROPS_FAILURE = "FETCH_PROPS_FAILURE";
export const PROP_DELETED = "PROP_DELETED";

export const propsLoaded = (propsList: IProp[]): IPropsLoaded =>
    ({
        payload: propsList,
        type: FETCH_PROPS_SUCCESS,
    });
export const propsRequested = ():Action => {
    return {
        type: FETCH_PROPS_REQUEST
    };
};
export const propsError = (error:string): IErrorLoaded => {
    return {
        payload: error,
        type: FETCH_PROPS_FAILURE
    };
};

export const propDeleted = (id: number): IDeleteProp =>
    ({
        payload: id,
        type: PROP_DELETED
    });


