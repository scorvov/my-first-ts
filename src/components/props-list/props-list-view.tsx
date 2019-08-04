import * as React from "react";
import {IProp} from "../../store/models/iProp";
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TablePagination,
    TableFooter, Paper
} from "@material-ui/core";
import {EnhancedTableHead} from "../common/table/table-head-enhanced";
import {TablePaginationActions} from "../common/table/table-pagination-actions";
import {useStyles2} from "../common/table/table-styles";
import {IActionTableProps} from "../products-list/products-list-view";
import {IPropsListStateProps} from "./container";
import Button from "@material-ui/core/Button";

const headRows = [
    {label: 'Перечень свойств', name: 'name'},
    {label: 'Тип', name: 'type'},
    {label: 'Управление', name: 'control'}];

export const PropsListView: React.FC<IActionTableProps & IPropsListStateProps> = (props) => {

    const {handleChangePage, handleChangePerPage, handleChangeSort, propsList, onDelete} = props;
    const {count, perPage, currentPage, order, orderBy} = propsList;
    const classes = useStyles2();

    return (
        <div className="list">
            <Button href={"/prop/create"}
                    variant="contained"
                    className={"add"}>
                Добавить свойство
            </Button>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            handleChangeSort={handleChangeSort}
                            headRows={headRows}
                        />
                        <TableBody>
                            {propsList.props.map((prop: IProp) => {
                                const {id, name, type} = prop;
                                return (
                                    <TableRow key={id}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{type}</TableCell>
                                        <TableCell>
                                            <button onClick={() => onDelete(id)} className="link">
                                                Удалить
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
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
            </Paper>
        </div>

    );
};
