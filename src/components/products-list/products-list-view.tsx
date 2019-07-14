import * as React from "react";
import {IProduct, IProductsList} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {IProductDelete} from "./products-list";
import {
    Paper, Table, TableBody, TableCell, TableFooter,
    TablePagination, TableRow
} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {TablePaginationActions} from "./table-pagination-actions";
import {EnhancedTableHead} from "./table-head-enhanced";

const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

export const ProductsListView: React.FC<IProductsList & IProductDelete & any> = (props) => {

    const {handleChangePage, handleChangePerPage, handleChangeSort, productsList, productDelete} = props;
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
                            // onRequestSort={handleRequestSort}
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
                                                onClick={() => productDelete(id, {
                                                    perPage,
                                                    currentPage,
                                                    order,
                                                    orderBy
                                                })}
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