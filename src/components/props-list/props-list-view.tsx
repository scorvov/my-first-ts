import * as React from "react";
import {IProp, IPropsList} from "../../store/models/iProp";
import {Link} from "react-router-dom";
import {IPropDelete} from "./props-list";

export const PropsListView: React.FC<IPropsList&IPropDelete> = ({propsList, propDelete}) => {
    const renderRow = ((prop: IProp) => {
        const {id, name, type} = prop;
        return (
            <tr key={id}>
                <td> </td>
                <td>{name}</td>
                <td>{type}</td>
                <td >
                    <button onClick={() => propDelete(id)} className="link">
                        Удалить
                    </button>
                </td>
            </tr>
        )
    });
    return (
        <div className="list">
            <Link to="/prop/create" className="btn btn-warning btn-sm" >Добавить свойство</Link>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Перечень свойств</th>
                    <th>Тип</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                { propsList.map(renderRow) }
                </tbody>
            </table>
        </div>
    );
};
