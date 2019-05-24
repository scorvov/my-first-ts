import * as React from "react";
import {Link, Redirect} from "react-router-dom";
import {TProps} from "./create-prop";

// interface Props {
//     id: number;
//     name: string;
//     cost: number;
//     img: string;
//     dateUp: string;
//     optional?: any;
// }

export const Product:React.FC<TProps> = (props) => {
    const {isLoggedIn} = props;
    if(isLoggedIn) {
        return (
            <>
                <Link to="/products"
                      className="link">
                    Вернуться
                </Link>
                <span>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg/1200px-Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg"
                    alt="auto"/>
                <h2>Mercedes S550 4matic</h2>
                <div><p>Information text</p></div>
            </span>
                <div>
                    <h3>Цвет авто</h3>
                    <p>синий</p>
                </div>
                <div>
                    <h3>Год выпуска</h3>
                    <p>2017</p>
                </div>
                <div>
                    <h3>Тип топлива</h3>
                    <p>Бензин</p>
                </div>
                <div>
                    <h3>Стоимость</h3>
                    <p>118 000</p>
                </div>
            </>
        );
    }
    return <Redirect to="/login" />;
};
