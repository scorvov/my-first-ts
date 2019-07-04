import {withFormik} from "formik";
import * as Yup from "yup";
import {CreateProp} from "./create-prop";

interface IPropCreate {
    propCreate: ({name, type}: ICreatePropValues) => void;
    history: {
        push(url:string): void
    }
}
export interface ICreatePropValues {
    name: string;
    type: string;
}

export const MyEnhancedForm = withFormik<ICreatePropValues & IPropCreate, ICreatePropValues>({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Название свойства должно быть не менее 2 символов")
            .max(30, "Слишком длинное название")
            .required("Требуется ввести название"),
        type: Yup.string().required("A radio option is required")
    }),

    mapPropsToValues: ({name, type}) => ({
        name: name || '',
        type: type || ''
    }),
    handleSubmit: ({name, type}, {props: {propCreate, history}, resetForm, setSubmitting}) => {
        propCreate({name, type});
        resetForm();
        setSubmitting(false);
        history.push('/properties');
    },
})(CreateProp);
