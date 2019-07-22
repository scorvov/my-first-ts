import {Action} from "redux";
import {IProduct} from "../models/iProduct";
import { RESET_SELECT_PRODUCT} from "../constants";
import {actionRequest} from "./base-actions";

export const resetSelectProduct = (): Action => ({type: RESET_SELECT_PRODUCT});

export const productDelete = (id: number, fetchParams: any) =>
    actionRequest("DELETE", "products/delete/" + id, fetchParams);

export const productCreate = (params: IProduct, fetchParams?: any) =>
    actionRequest("POST", "products/add", fetchParams, params);

export const productUpdate = (params: IProduct, fetchParams?: any) =>
    actionRequest("POST", "products/update", fetchParams, params);


