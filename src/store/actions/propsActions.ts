import {Dispatch} from "redux";
import {carstoreService, fetchData} from "./fetchingActions";
import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";

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


