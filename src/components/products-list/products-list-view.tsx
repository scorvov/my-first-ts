import * as React from "react";
import {IProduct} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {
    Paper, Table, TableBody, TableCell, TableFooter,
    TablePagination, TableRow
} from "@material-ui/core";

import {TablePaginationActions} from "../common/table/table-pagination-actions";
import {EnhancedTableHead, Order} from "../common/table/table-head-enhanced";
import {useStyles2} from "../common/table/table-styles";
import {IProductListStateProps} from "./container";

const headRows = [
    {label: 'Перечень товаров', name: 'name'},
    {label: 'Стоимость', name: 'cost'},
    {label: 'Дата изменения', name: 'dateUp'},
    {label: 'Управление', name: 'control'}];

export interface IActionTableProps {
    onDelete: (id:number) => void;
    handleChangeSort: (order:Order, orderBy:string) => void;
    handleChangePerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => void;
}

export const ProductsListView: React.FC<IActionTableProps&IProductListStateProps> = (props) => {

    const {handleChangePage, handleChangePerPage, handleChangeSort, productsList, onDelete} = props;
    const {count, perPage, currentPage, order, orderBy} = productsList;
    const classes = useStyles2();

    return (
        <div className="list">
            <Link to="/product/create"
                  className="btn btn-warning btn-sm">
                Добавить товар
            </Link>
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
                            {productsList.products.map((product: IProduct) => {
                                const {id, name, cost, dateUp} = product;
                                const date = new Date(dateUp).toLocaleDateString();
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <Link to={`/product/${id}`}
                                                  className="link">{name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{cost && cost.toLocaleString()} $</TableCell>
                                        <TableCell>{date} </TableCell>
                                        <TableCell>
                                            <Link to={`/product/update/${id}`}
                                                  className="link">Ред
                                            </Link>
                                            <button
                                                onClick={() => onDelete(id)}
                                                className="link">
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
                                    rowsPerPageOptions={[5, 10, 25]}
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
        </div>)
};