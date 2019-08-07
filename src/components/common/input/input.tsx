import * as React from "react";
import "../../../assests/styles/input.scss";
import "../../../assests/svg/download.svg";
import {Field} from "formik";
import {useState} from "react";

const Input = ({label, required, type, name, error, value, touched, ...props}: any) => {

    let component = (props.component === "textarea") ? "textarea" : (props.component === "select") ? "select" : "input";
    const [innerText, setInner] = useState("visibility_off");
    const [typeOwn, setType] = useState(type);
    const visibilityToggle = () => {
        if (typeOwn === "password") {
            setInner("visibility");
            setType("text");
        } else {
            setInner("visibility_off");
            setType("password");
        }
    };
    return (
        <div className={`${component}-group-elements`}>
            <label className={required ? "label required" : "label"}>
                {label}
            </label>
            <div className={`${component}-container`}>
                <Field
                    className={error && touched ? `${component} ${name} error` : `${component} ${name}`}
                    type={typeOwn}
                    name={name}
                    {...props}
                />

            </div>{name === "password" && <i
            onClick={visibilityToggle}
            className="material-icons visibility">
            {innerText}
        </i>}
{/*            {name === "img" && <i
                alt={"svg"}
                className={"image"}
            >none</i>}*/}
            {touched && <span className="input-feedback">{error}</span>}
        </div>
    );
};

export {Input};
