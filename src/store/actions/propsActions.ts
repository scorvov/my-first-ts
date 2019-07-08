import { fetchData} from "./fetchingActions";
import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";

export const propDelete = (id: number) => {
    return (dispatch: any) => {
        fetch( "http://localhost:9000/props/delete/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData('props'));
                }
            }));
    }
};

export const propCreate = (params: ICreatePropValues) => {
    return (dispatch: any) => {
        fetch("http://localhost:9000/props/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData('props'));
                }
            }));
    }
};


