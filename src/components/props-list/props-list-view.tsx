import * as React from "react";
import {IProp} from "../../store/models/iProp";
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TablePagination,
    TableFooter
} from "@material-ui/core";
import {EnhancedTableHead} from "../common/table/table-head-enhanced";
import {TablePaginationActions} from "../common/table/table-pagination-actions";
import {IActionTableProps} from "../products-list/products-list-view";
import {IPropsListStateProps} from "./container";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const headRows = [
    {label: 'Перечень свойств', name: 'name'},
    {label: 'Тип', name: 'type'},
    {label: 'Управление', name: 'control'}];

export const PropsListView: React.FC<IActionTableProps & IPropsListStateProps> = (props) => {

    const {handleChangePage, handleChangePerPage, handleChangeSort, propsList, onDelete} = props;
    const {count, perPage, currentPage, order, orderBy} = propsList;

    return (
        <div className="list">
            <Link to="/prop/create" className={"wr-link"}>
                <Button variant="contained"
                        className={"add"}>
                    Добавить свойство
                </Button>
            </Link>
            <Table>
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    handleChangeSort={handleChangeSort}
                    headRows={headRows}
                />
                {count > 0 && <TableBody>
                    {propsList.items.map((prop: IProp) => {
                        const {id, name, type} = prop;
                        return (
                            <TableRow key={id}>
                                <TableCell className={"cell cell-name"}>{name}</TableCell>
                                <TableCell className={"cell cell-default"}>{type}</TableCell>
                                <TableCell className={"cell"}>
                                    <button onClick={() => onDelete(id)} className="link delete">
                                        Удалить
                                    </button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>}
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={3}
                            count={count}
                            rowsPerPage={perPage}
                            page={currentPage}
                            SelectProps={{
                                inputProps: {'aria-label': 'Rows per page'},
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={(e) => handleChangePerPage(e)}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>

    );
};
