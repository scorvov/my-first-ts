import {Action} from "redux";
import {IProduct} from "../models/iProduct";
import {EMPTY_SELECT_PRODUCT, RESET_SELECT_PRODUCT} from "../constants";
import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";
import {fetchData, fetchError, fetchProductById} from "./fetching-actions";
import {fetchRequest} from "./fetch-request";
import {authResponse} from "./auth-actions";
import {enqueueSnackbar} from "./toast-actions";

export const resetSelectProduct = (): Action => ({type: RESET_SELECT_PRODUCT});
export const emptySelectProduct = ():Action => ({type: EMPTY_SELECT_PRODUCT});

export const message = function (path: string) {
    if (path.includes("products")) {
        if (path.includes("delete")) return "Товар успешно удален !";
        if (path.includes("add")) return "Товар успешно добавлен !";
        if (path.includes("update")) return "Товар успешно обновлен !";
    }
    if (path.includes("props")) {
        if (path.includes("delete")) return "Свойство успешно удалено !";
        if (path.includes("add")) return "Свойство успешно добавлено !";
    }
    return "Загрузка прошла успешно";
};

export const baseDataAction = (method: string, path: string, params?: any) => (dispatch: any) => {
    return fetchRequest(method, path, params)
        .then((response) => authResponse(response))
        .then(() => {
            dispatch(enqueueSnackbar({
                message: message(path),
                variant: "success"
            }));
        })
        .catch((err: string) => {
            dispatch(enqueueSnackbar({
                message: "Внутренняя ошибка, не удалось внести изменения",
                variant: "error"
            }));
            dispatch(fetchError(err));
        })
};

export const itemDeleteById = (id: number, typeData: string, fetchParams: any) => (dispatch:any) => {
    dispatch(baseDataAction("DELETE", typeData + "/delete/" + id))
        .then(() => dispatch(fetchData(typeData, fetchParams)));
};
export const itemCreate = (typeData: string, params: ICreatePropValues | IProduct) =>
    baseDataAction("POST", typeData+"/add", params);

export const productUpdate = (typeData: string, params: IProduct) =>
    baseDataAction("POST", typeData + "/update", params);


export const fetchDataForUpdate = (id:number) => (dispatch:any) => {
    dispatch(resetSelectProduct());
    (id) ? dispatch(fetchProductById(id)) : dispatch(emptySelectProduct());
    dispatch(fetchData('props', {perPage: 100, currentPage: 0}));
};




