import * as React from "react";
import {IProduct, IProductsList} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {IProductDelete} from "./products-list";
// import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export const ProductsListView: React.FC<IProductsList & IProductDelete> = ({productsList, productDelete}) => {
/*    const headRows = [
        {id: 'name', label: 'Перечень товаров'},
        {id: 'cost', label: 'Перечень товаров'},
        {id: 'dateUp', label: 'Перечень товаров'},
        {id: 'name', label: 'Перечень товаров'},
    ];*/


    return (
        <div className="list">
            <Link to="/product/create"
                  className="btn btn-warning btn-sm">
                Добавить товар
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Перечень товаров</th>
                    <th>Стоимость</th>
                    <th>Дата изменения</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                {productsList.products.map((product: IProduct) => {
                    const {id, name, cost, dateUp} = product;
                    return (
                        <tr key={id}>
                            <td> </td>
                            <td><Link to={`/product/${id}`}
                                      className="link">{name}</Link></td>
                            <td>{cost} $</td>
                            <td>{dateUp}</td>
                            <td>
                                <Link to={`/product/update/${id}`}
                                      className="link"
                                >Ред</Link>
                                <button
                                    onClick={() => productDelete(id, {perPage: 10, currentPage: 1})}
                                    className="link">
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

/*return (
    <div className="list">
        <Link to="/product/create"
              className="btn btn-warning btn-sm">
            Добавить товар
        </Link>
        <Table className="table">
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Перечень товаров</TableCell>
                    <TableCell>Стоимость</TableCell>
                    <TableCell>Дата изменения</TableCell>
                    <TableCell>Управление</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productsList.products.map((product: IProduct) => {
                    const {id, name, cost, dateUp} = product;
                    return (
                        <TableRow key={id}>
                            <TableCell> </TableCell>
                            <TableCell><Link to={`/product/${id}`}
                                             className="link">{name}</Link></TableCell>
                            <TableCell>{cost} $</TableCell>
                            <TableCell>{dateUp}</TableCell>
                            <TableCell>
                                <Link to={`/product/update/${id}`}
                                      className="link"
                                >Ред</Link>
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
        </Table>
    </div>*/
