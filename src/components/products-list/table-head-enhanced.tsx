import * as React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";

const headRows = [
    {label: 'Перечень товаров', name: 'name'},
    {label: 'Стоимость', name: 'cost'},
    {label: 'Дата изменения', name: 'dateUp'},
    {label: 'Управление', name: 'control'}];

interface EnhancedTableProps {
    order: 'asc' | 'desc';
    orderBy: string;
    handleChangeSort: (order: string, orderBy: string) => void
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
    const {order, orderBy, handleChangeSort} = props;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isDesc = orderBy === property && order === "desc";
        handleChangeSort(isDesc ? "asc" : "desc", property);
    };
    const createSortHandler = (orderBy: string) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, orderBy);
    };
    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.name}
                        sortDirection={orderBy === row.name ? order : false}
                    > {(row.name === 'control') ? row.label
                        : <TableSortLabel
                            active={orderBy === row.name}
                            direction={order}
                            onClick={createSortHandler(row.name)}
                        >
                            {row.label}
                        </TableSortLabel>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};