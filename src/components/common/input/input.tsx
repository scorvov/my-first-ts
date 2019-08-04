import * as React from "react";
import "../../../assests/styles/input.scss";
import {Field} from "formik";

const Input = ({label, required, type, name, error, value, touched, ...props}: any) => {
    let component = (props.component === "textarea") ? "textarea" : "input";
    return (
        <div className={`${component}-group-elements`} >
            <label className={required ? "label required" : "label"}>
                {label}
            </label>
            <Field
                className={ error && touched ? `${component} error` : `${component}`}
                type={type}
                name={name}
                {...props}
            />
               {touched && <span className="input-feedback">{error}</span>}

        </div>
    );
};

export {Input};
