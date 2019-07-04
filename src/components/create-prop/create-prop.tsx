import * as React from "react";
import {Link} from "react-router-dom";
import {Input} from "../common/input/input";
import {Field, Form, FormikProps} from "formik";
import {RadioButton, RadioButtonGroup} from "../common/radio-button-group/radio-button-group";
import "../../assests/styles/prop-create.scss";
import {ICreatePropValues} from "./with-formik-prop";

export const CreateProp: React.FC<FormikProps<ICreatePropValues>> = (props) => {
    const {
        touched,
        errors,
        isSubmitting,
        values
    } = props;
    return (
        <Form className="create-prop">
            <div className="group-buttons">
                <Link to="/properties"
                      className="btn btn-danger btn-sm">
                    Вернуться
                </Link>
                <button
                    type={"submit"}
                    disabled={isSubmitting}
                    className="btn btn-success btn-sm">
                    Сохранить
                </button>
            </div>
            <hr className="line"/>
            <h4>Добавление свойства</h4>
            <hr className="line"/>
            <div className={"input-form"}>
                <Input
                    label={"Название свойства"}
                    placeholder={"Цвет авто"}
                    name="name"
                    error={errors.name}
                    touched={touched.name}
                />
                <RadioButtonGroup
                    id="radio"
                    label="Укажите тип свойства"
                    value={values.type}
                    error={errors.type}
                    touched={touched.type}
                >
                    <Field
                        component={RadioButton}
                        name="type"
                        id="dropdown"
                        label="Dropdown"
                    />
                    <Field
                        component={RadioButton}
                        name="type"
                        id="number"
                        label="Number"
                    />
                    <Field
                        component={RadioButton}
                        name="type"
                        id="string"
                        label="String"
                    />
                </RadioButtonGroup>
            </div>
        </Form>
    );
};
