import * as React from "react";
import {Radio} from "@material-ui/core";

export const RadioButton = ({
                                field: {name, value, onChange, onBlur},
                                id,
                                label,
                                className,
                                ...props}: any) => {
    return (
        <div className={"wrapper-radio"}>
            <Radio
                color={'primary'}
                name={name}
                id={id}
                type="radio"
                value={id}
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={"radio-button"}
                {...props}
            />
            <label htmlFor={id}> {label}</label>
        </div>
    );
};

export const RadioButtonsGroup = ({error, touched, children, label}: any) => {
    return (
        <div className={"radio-buttons-group"}>
            <label className={"label required"}>
                {label}
            </label>
            <fieldset className={"fieldset"}>
                {children}
                {error && touched && <div className={"input-feedback"}>{error}</div>}
            </fieldset>
        </div>
    );
};

