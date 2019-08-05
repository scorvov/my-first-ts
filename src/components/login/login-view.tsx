import React from 'react';
import {Input} from "../common/input/input";
import {Form, FormikProps} from "formik";
import {IPropLogin, IPropValuesLogin} from "./with-formik-login";
import "../../assests/styles/login.scss"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export interface AddProps {
    errors:{},
    touched:{},
    isSubmitting: boolean;
}
export const LoginView: React.FC<AddProps&FormikProps<IPropValuesLogin&IPropLogin>> = (props) => {
    const {errors, touched, isSubmitting} = props;
    return (
        <Container className={"login-paper"} component="main">
                <Form className={"login-form"}>
                    <p className={"header"}>
                        Вход
                    </p>
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
                    <Button
                        variant="contained"
                        type={"submit"}
                        className={"login-button"}
                        disabled={isSubmitting}
                    >
                        Войти
                    </Button>
                </Form>
        </Container>
    );
};
