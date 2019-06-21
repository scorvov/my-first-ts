import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import {IMapState} from "./products-list";
import {connect} from "react-redux";
import {productSelected} from "../../store/actions/fetchProducts";
import {IProp} from "../../store/models/iProp";


export class Product extends React.Component<any> {
    componentDidMount(): void {
        const {id} = this.props.match.params;
        const {productSelected} = this.props;
        productSelected(+id);
    }

    render() {
        const {isLoggedIn, selectProduct} = this.props;
        // if (!isLoggedIn) return <Redirect to="/login"/>;
        if (!selectProduct) return <div>Loading...</div>;
        const {name, cost, img, info, productProps} = selectProduct;
        const showProps = (productProps: IProp[]) => {
            if (productProps) {
                return productProps.map((item: IProp) => {
                    const {id, name, type, value} = item;
                    let valueProp;
                    if (type === 'dropdown') {
                        valueProp = <select>
                            <option>{value}</option>
                        </select>
                    } else valueProp = <p>{value}</p>;
                    return (
                        <div key={id}>
                            <h3>{name}</h3>
                            {valueProp}
                        </div>
                    )
                })
            }
        };
        return (
            <>
                <Link to="/products"
                      className="link">
                    Вернуться
                </Link>
                <hr className="line"/>
                <span>
                <img
                    src={img}
                    alt="auto"/>
                <h2>{name}</h2>
                <div><p>{info}</p></div>
            </span>
                {showProps(productProps)}
                <div>
                    <h3>Стоимость</h3>
                    <p>{cost}$</p>
                </div>
            </>
        );

    }
}

const mapStateToProps = ({productsState: selectProduct}: IMapState) => {
    return selectProduct
};
const mapDispatchToProps = {
    productSelected
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));
