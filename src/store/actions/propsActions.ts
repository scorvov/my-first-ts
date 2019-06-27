import {Dispatch} from "redux";
import {ICreatePropValues} from "../../components/pages/create-prop";
import {carstoreService, fetchData} from "./fetchingActions";

export const propDelete = (id: number) => {
    return (dispatch: Dispatch) => {
        carstoreService.deleteProp(id)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};

export const propCreate = (paramsForCreateProp: ICreatePropValues) => {
    return (dispatch: Dispatch) => {
        carstoreService.createProp(paramsForCreateProp)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};


