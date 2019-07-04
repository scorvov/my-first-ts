import * as React from "react";
import "../../../assests/styles/input.scss";
import {Field} from "formik";

const Input = ({label, name, error, value, touched, ...props}: any) => {
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
               {error && touched && <div className="input-feedback">{error}</div>} 

        </div>
    );
};

export {Input};
