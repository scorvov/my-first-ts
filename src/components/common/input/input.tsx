import * as React from "react";
import "../../../assests/input.scss";
import {Field} from "formik";

const Input = ({label, name, error, touched, ...props}: any) => {
    return (
        <div className="input-group" >
            <label className={"label"}>
                {label}
            </label>
            <Field
                className={ error && touched ? 'text-input error' : 'text-input'}
                type="text"
                name={name}
                {...props}
            />
                <div className="input-feedback">{error}</div>

        </div>
    );
};

export {Input};
