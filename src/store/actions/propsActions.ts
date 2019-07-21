import {fetchData} from "./fetchingActions";
import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";
import {baseURL} from "../constants";

export const propDelete = (id: number, fetchParams: any) => {
    return (dispatch: any) => {
        fetch(baseURL + "props/delete/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(() => dispatch(fetchData('props', fetchParams)))
    }
};

export const propCreate = (params: ICreatePropValues) => {
    return () => {
        fetch(baseURL + "props/add", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(() => console.log("Prop created"));
    }
};


