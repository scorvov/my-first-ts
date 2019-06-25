import {Action, Dispatch} from "redux";
import {IProp} from "../models/iProp";
import {ILoadedErrorAction} from "./fetchProducts";
// import {ICreatePropValues} from "../../components/pages/create-prop";
import {CarstoreService} from "../../services/carstore-service";
// import {ICreateProductValues} from "../../components/pages/create-product";

const carstoreService = new CarstoreService();

export interface ILoadedPropsAction extends Action {
    payload: any;
}
/*export interface IDeletePropAction extends Action {
    payload: number;
}
export interface ICreatePropAction extends Action {
    payload: ICreatePropValues
}*/
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
export const fetchProps = ():any => {
    return (dispatch:any) => {
        dispatch(propsRequested());
        carstoreService.getProps()
            .then((data:any) => dispatch(propsLoaded(data)))
            .catch((err) => dispatch(propsError(err)));
    }
};
/*export const propDeleted = (id: number): IDeletePropAction =>
    ({
        payload: id,
        type: PROP_DELETED
    });*/
// export const propCreated = (values:ICreatePropValues): ICreatePropAction =>
//     ({
//         payload: values,
//         type: PROP_CREATED
//     });

export const propDelete = (id:number) => {
    return (dispatch:Dispatch) => {
        carstoreService.deleteProp(id)
            .then(((response:any) => {
                if(response.ok) {
                    // dispatch(productDeleted(id));
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
                    // dispatch(productCreated(paramsForCreateProduct));
                    dispatch(fetchProps());
                }
            }));
    }
};


