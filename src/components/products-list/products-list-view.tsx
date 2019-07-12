import * as React from "react";
import {IProduct, IProductsList} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {IProductDelete} from "./products-list";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));
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

function TablePaginationActions(props: any) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    function handleFirstPageButtonClick(event: any) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event: any) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event: any) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event: any) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}


export const ProductsListView: React.FC<IProductsList & IProductDelete & any> = (props) => {
    const headersRow = [' ', 'Перечень товаров', 'Стоимость', 'Дата изменения', 'Управление'];
    const { handleChangePage, handleChangePerPage, productsList, productDelete } = props;
    const classes = useStyles2();
    console.log('renderView');
    return (
        <div className="list">
            <Link to="/product/create"
                  className="btn btn-warning btn-sm">
                Добавить товар
            </Link>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {headersRow.map((header: string, index:number) =>
                                    (<TableCell key={index}>{header}</TableCell>)
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsList.products.map((product: IProduct) => {
                                const {id, name, cost, dateUp} = product;
                                return (
                                    <TableRow key={id}>
                                        <TableCell> </TableCell>
                                        <TableCell>
                                            <Link to={`/product/${id}`}
                                                  className="link">{name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{cost} $</TableCell>
                                        <TableCell>{dateUp}</TableCell>
                                        <TableCell>
                                            <Link to={`/product/update/${id}`}
                                                  className="link">Ред
                                            </Link>
                                            <button
                                                onClick={() => productDelete(id, {perPage: 10, currentPage: 1})}
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
                                    count={productsList.count}
                                    rowsPerPage={productsList.perPage}
                                    page={productsList.currentPage}
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