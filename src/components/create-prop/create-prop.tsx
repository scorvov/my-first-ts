import * as React from "react";
import {Input} from "../common/input/input";
import {Field, Form, FormikProps} from "formik";
import {RadioButton, RadioButtonsGroup} from "../common/radio-buttons-group/radio-buttons-group";
import {ICreatePropValues} from "./with-formik-prop";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export const CreateProp: React.FC<FormikProps<ICreatePropValues>> = (props) => {
    const {
        touched,
        errors,
        isSubmitting,
        values
    } = props;
    return (
        <div className="create-container">
            <Form className={"form"}>
                <div className="group-buttons">
                    <Link to={"/properties"} className={"wr-link"}>
                        <Button variant="contained"
                                className={"back"}>
                            Вернуться
                        </Button>
                    </Link>
                    <Button
                        type={"submit"}
                        variant="contained"
                        disabled={isSubmitting}
                        className={"save"}>
                        Сохранить
                    </Button>
                </div>
                <hr className="line"/>
                <p className={"header"}>Добавление свойств</p>
                <hr className="line"/>
                <div className={"input-form"}>
                    <Input
                        required
                        label={"Название свойства"}
                        placeholder={"Цвет авто"}
                        name="name"
                        error={errors.name}
                        touched={touched.name}
                    />
                    <RadioButtonsGroup
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
                    </RadioButtonsGroup>
                </div>
            </Form>
        </div>
    );
};
