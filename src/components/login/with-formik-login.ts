import {withFormik} from "formik";
import * as Yup from "yup";
import {AddProps, LoginView} from "./login-view";

export interface IPropLogin {
    authorization: ({login,password}: IPropValuesLogin) => void;
}
export interface IPropValuesLogin {
    login: string;
    password: string;
}

export const MyEnhancedLoginView = withFormik<any&IPropValuesLogin & IPropLogin, IPropValuesLogin,AddProps>({
    validationSchema: Yup.object().shape({
        login: Yup.string()
            .min(2, "Логин должен быть не менее 2 символов")
            .max(30, "Слишком длинный логин")
            .required("Требуется ввести логин"),
        password: Yup.string()
            .min(8, "Пароль должен быть не менее 8 символов")
            .required("Требуется ввести пароль")
    }),

    mapPropsToValues: ({login, password}) => ({
        login: login || '',
        password: password || ''
    }),
    handleSubmit: ({login,password}, {props: {authorization}, resetForm, setSubmitting}) => {
        authorization({login,password});
        resetForm();
        setSubmitting(false);
    },
})(LoginView);
