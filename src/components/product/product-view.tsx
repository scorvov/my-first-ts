import * as React from "react";
import {IProp} from "../../store/models/iProp";
import {Link} from "react-router-dom";
import {ISelectProduct} from "./container";
import {CardMedia} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {Spinner} from "../common/spinner";

export const ProductView: React.FC<ISelectProduct> = ({selectProduct}) => {
    if (!selectProduct) return <Spinner/>;
    const {name, cost, img, info, productProps} = selectProduct;
    const showProps = (productProps: IProp[]) => {
        if (productProps) {
            return productProps.map((item: IProp) => {
                const {id, name, type, value} = item;
                return (
                    <div key={id}>
                        <p className={"header"}>{name}</p>
                        {(type === 'dropdown') ?
                            <select className="data select">
                                <option>{value}</option>
                            </select>
                            : <p className="data">
                                {value}
                            </p>}
                    </div>
                )
            })
        }
    };
    return (
        <div className={"product"}>
            <div className={"wrapper"}>
                <Link to="/products" className={"link"}>
                    Вернуться
                </Link>
                <hr className="line"/>
                <Card className={"card"}>
                    <CardMedia className={"image"} image={img} title="auto"/>
                    <CardContent className={"info"}>
                        <h5>{name}</h5>
                        {info !== "" ? <p>{info}</p> : null}
                    </CardContent>
                </Card>
                <CardContent className={"details"}>
                    {showProps(productProps)}
                    <p className={"header"}>
                        Стоимость
                    </p>
                    <div className={"cost"}>
                        <p className={"data"}>{cost.toLocaleString()} $</p>
                        <p className={"data"}><Button variant="contained" className={"btn"}>Беру!!!</Button></p>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};
