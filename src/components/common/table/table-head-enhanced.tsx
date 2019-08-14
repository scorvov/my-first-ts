import * as React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import SortLabel from '@material-ui/icons/KeyboardArrowDown';

export type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    order: Order;
    orderBy: string;
    handleChangeSort: (order: Order, orderBy: string) => void;
    headRows: {label: string, name: string}[];
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
    const {order, orderBy, handleChangeSort, headRows} = props;

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
                {headRows.map(row => {
                    let classHead = ((row.name === "name") ?
                        `${row.name}` :
                        (row.name !== "control") ? "head-default" : "");
                    return (
                    <TableCell
                        className={classHead}
                        key={row.name}
                        sortDirection={orderBy === row.name ? order : false}
                    > {(row.name === 'control') ? row.label
                        : <TableSortLabel
                            IconComponent={SortLabel}
                            active={orderBy === row.name}
                            direction={order}
                            onClick={createSortHandler(row.name)}
                        >
                            {row.label}
                        </TableSortLabel>}
                    </TableCell>
                )})}
            </TableRow>
        </TableHead>
    );
};