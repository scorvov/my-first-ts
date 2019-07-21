import {withFormik} from "formik";
import * as Yup from "yup";
import {LoginView} from "./login-view";

export interface IPropLogin {
    getAuthUserData: (values: IPropValuesLogin) => void;
}
export interface IPropValuesLogin {
    login: string;
    password: string;
}

export const MyEnhancedLoginView = withFormik<any & IPropValuesLogin & IPropLogin, IPropValuesLogin>({
    validationSchema: Yup.object().shape({
        login: Yup.string()
            .min(2, "Логин должен быть не менее 2 символов")
            .max(30, "Слишком длинный логин")
            .required("Требуется ввести название"),
        password: Yup.string()
            .min(8, "Пароль должен быть не менее 8 символов")
            .required("Требуется ввести пароль")
    }),

    mapPropsToValues: ({login, password}) => ({
        login: login || '',
        password: password || ''
    }),
    handleSubmit: (values, {props: {getAuthUserData}, resetForm, setSubmitting}) => {
        getAuthUserData(values);
        resetForm();
        setSubmitting(false);
    },
})(LoginView);
