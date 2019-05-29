import * as React from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import {Input} from "../common/input/input";
import {Form, withFormik} from "formik";
import * as Yup from "yup";


export type TProps = {
    // isLoggedIn: boolean
}
const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        text: Yup.string()
            .min(2, "Название свойство должно быть не менее 2 символов")
            .max(30, "Слишком длинное название")
            .required("First name is required."),
    }),

    mapPropsToValues: ({text, radio}: any) => ({
        text: text || '',
        radio: radio || 'radio1'
    }),
    handleSubmit: (values: any, {setSubmitting}: any) => {
        console.log(values);
        setSubmitting(false);
    },
    // displayName: "MyForm"
});

export const CreateProp: React.FC<any> = (props) => {
    const {
        isLoggedIn,
        touched,
        errors,
        isSubmitting,
        // handleSubmit,
        // values
    } = props;
    if (isLoggedIn) {
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
                        name="text"
                        errors={errors}
                        touched={touched}
                    />
                    <label>Укажите тип свойства</label><br/>
                    <input type="radio" name="radio1" id="radio1"/> Dropdown<br/>
                    <input type="radio" name="radio2" id="radio2"/> Number<br/>
                    <input type="radio" name="radio3" id="radio3"/> String<br/>
                </div>
            </Form>
        );
    }
    return <Redirect to="/login"/>;
};

export const MyEnhancedForm = formikEnhancer(CreateProp);
