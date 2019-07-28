import * as React from "react";
import {IProp} from "../../store/models/iProp";
import {Link} from "react-router-dom";
import {ISelectProduct} from "./container";
import "../../assests/styles/product.scss"
import {Container} from "@material-ui/core";

export const ProductView: React.FC<ISelectProduct> = ({selectProduct}) => {
    if (!selectProduct) return null;
    const {name, cost, img, info, productProps} = selectProduct;
    const showProps = (productProps: IProp[]) => {
        if (productProps) {
            return productProps.map((item: IProp) => {
                const {id, name, type, value} = item;
                return (
                    <div key={id}>
                        <h3>{name}</h3>
                        {(type === 'dropdown') ?
                            <select>
                                <option>{value}</option>
                            </select>
                            : <p>{value}</p>}
                    </div>
                )
            })
        }
    };
    return (
        <Container className={"product"}>
            <Link to="/products" className={"link"}>
                Вернуться
            </Link>
            <hr className="line"/>
            <span>
                <img src={img} alt="auto"/>
                <h2>{name}</h2>
                <div><p>{info}</p></div>
            </span>
            {productProps && showProps(productProps)}
            <div>
                <h3>Стоимость</h3>
                <p>{cost.toLocaleString()} $</p>
            </div>
        </Container>
    );
};
