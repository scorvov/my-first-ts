import React from 'react';
import {Input} from "../common/input/input";
import {Form, FormikProps} from "formik";
import {IPropLogin, IPropValuesLogin} from "./with-formik-login";

export const LoginView: React.FC<any & IPropLogin & FormikProps<IPropValuesLogin>> = (props) => {
    const {errors, touched, isSubmitting} = props;
    return (
        <Form >
        <div className="jumbotron">
            <div className={"input-form"}>
                <Input
                    label={"Логин"}
                    placeholder={"Введите логин"}
                    name="login"
                    type={"text"}
                    error={errors.login}
                    touched={touched.login}

                />
                <Input
                    label={"Пароль"}
                    placeholder={"Введите пароль"}
                    name="password"
                    type={"password"}
                    error={errors.password}
                    touched={touched.password}
                />
            </div>
            <button
                className="btn btn-primary"
                type={"submit"}
                disabled={isSubmitting}
            >
                Login
            </button>
        </div>
        </Form>
    );
};
