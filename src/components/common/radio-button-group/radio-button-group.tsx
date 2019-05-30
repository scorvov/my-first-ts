import * as React from "react";
import classNames from "classnames";

const InputFeedback = ({error}:any) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;
// Radio input
export const RadioButton = ({
    field: {name, value, onChange, onBlur},
    id,
    label,
    className,
    ...props}: any) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames("radio-button")}
                {...props}
            />
            <label htmlFor={id}> {label}</label>
        </div>
    );
};

export const RadioButtonGroup = ({error, touched, children, label}: any) => {
    return (
        <div >
            <label className={"label"}>
                {label}
            </label>
            <fieldset>
                {children}
                {touched && <InputFeedback error={error}/>}
            </fieldset>
        </div>
    );
};

