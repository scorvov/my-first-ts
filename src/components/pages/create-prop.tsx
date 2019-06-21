import * as React from "react";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import {Input} from "../common/input/input";
import {Field, Form, FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {RadioButton, RadioButtonGroup} from "../common/radio-button-group/radio-button-group";
import {connect} from "react-redux";
import {propCreated} from "../../store/actions/fetchProps";
import {ILogin} from "./main-page";


const CreatePropView: React.FC<ILogin&FormikProps<ICreatePropValues>> = (props) => {
    const {
        isLoggedIn,
        touched,
        errors,
        isSubmitting,
        values
    } = props;
    // if (!isLoggedIn) return <Redirect to="/login"/>;
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
                        // onClick={handleSubmit}
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
                        label= "Укажите тип свойства"
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

export interface ICreatePropValues {
    name: string;
    type: string;
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Название свойства должно быть не менее 2 символов")
            .max(30, "Слишком длинное название")
            .required("Требуется ввести название"),
        type: Yup.string().required("A radio option is required")
    }),

    mapPropsToValues: ({name, type}:any) => ({
        name: name || '',
        type: type || ''
    }),
    handleSubmit: (values: ICreatePropValues, {props:{propCreated},resetForm,setSubmitting}) => {
        propCreated(values);
        resetForm();
        setSubmitting(false);
    },
    // displayName: "MyForm"
})(CreatePropView);

export const CreateProp = connect(null, {propCreated})(formikEnhancer);
