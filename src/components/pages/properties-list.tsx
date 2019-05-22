import * as React from "react";
import {Link} from "react-router-dom";

export const PropertiesList = () => {
    return (
        <>
            <Link to="/property/create">Добавить проперти</Link>
            <div>TableListProperties</div>
        </>
    );
};
