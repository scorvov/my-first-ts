import * as React from "react";
import {IProp, IPropsList} from "../../store/models/iProp";
import {Link} from "react-router-dom";
import {IPropDelete} from "./props-list";
import {Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";

export const PropsListView: React.FC<IPropsList&IPropDelete> = ({propsList, propDelete}) => {
    return (
        <div className="list">
            <Link to="/prop/create" className="btn btn-warning btn-sm" >Добавить свойство</Link>
            <Table className="table">
                <TableHead>
                <TableRow>
                    <TableCell> </TableCell>
                    <TableCell>Перечень свойств</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Управление</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                { propsList.map((prop: IProp) => {
                    const {id, name, type} = prop;
                    return (
                        <TableRow key={id}>
                            <TableCell> </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{type}</TableCell>
                            <TableCell>
                                <button onClick={() => propDelete(id)} className="link">
                                    Удалить
                                </button>
                            </TableCell>
                        </TableRow>
                    )
                }) }
                </TableBody>
            </Table>
        </div>
    );
};
