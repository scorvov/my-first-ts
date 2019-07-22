import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";
import {actionRequest} from "./base-actions";


export const propDelete = (id: number, fetchParams: any) =>
    actionRequest("DELETE", "props/delete/" + id, fetchParams);

export const propCreate = (params: ICreatePropValues, fetchParams?: any) =>
    actionRequest("POST", "props/add", fetchParams, params);



