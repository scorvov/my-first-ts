import * as React from "react";
import "../../../assests/input.scss";
import {Field} from "formik";

const Select = ({label, name, error, touched, ...props}: any) => {
    return (
        <div className="input-group">
            <label className={"label"}>
                {label}
            </label>
            <Field
                name={name}
                {...props}
            />
        </div>
    );
};

export {Select};
