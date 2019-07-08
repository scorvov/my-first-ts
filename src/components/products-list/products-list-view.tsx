import * as React from "react";
import {IProduct, IProductsList} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {IProductDelete} from "./products-list";

export const ProductsListView: React.FC<IProductsList & IProductDelete> = ({productsList, productDelete}) => {
    const renderRow = ((product: IProduct) => {
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
                        onClick={() => productDelete(id)}
                        className="link">
                        Удалить
                    </button>
                </td>
            </tr>
        )
    });
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
                {productsList.map(renderRow)}
                </tbody>
            </table>
        </div>
    );
};
