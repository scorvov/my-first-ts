import * as React from "react";
import "./input.scss";
import {Field} from "formik";

const Input = ({label, name, errors, touched, ...props}: any) => {
    return (
        <div className="input-group" >
            <label className={"label"}>
                {label}
            </label>
            <Field
                className={ errors.text && touched.text ? 'text-input error' : 'text-input'}
                type="text"
                name={name}
                {...props}
            />
                <div className="input-feedback">{errors.text}</div>

        </div>
    );
};

export {Input};
