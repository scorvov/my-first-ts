import * as React from "react";
import "../../../assests/styles/input.scss";
import {Field} from "formik";

const Input = ({label, required, type, name, error, value, touched, ...props}: any) => {
    console.log(props.component);
    let component = (props.component === "textarea") ? "textarea" : (props.component === "select") ? "select" : "input";
    console.log(component);
    return (
        <div className={`${component}-group-elements`}>
            <label className={required ? "label required" : "label"}>
                {label}
            </label>
            <div className={"input-container"}>
                <Field
                    className={error && touched ? `${component} ${name} error` : `${component} ${name}`}
                    type={type}
                    name={name}
                    {...props}
                />
                {name === "password" && <i className="material-icons visibility">visibility_off</i>}
            </div>
            {touched && <span className="input-feedback">{error}</span>}

        </div>
    );
};

export {Input};
