import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {IMapState} from "./products-list";
import {connect} from "react-redux";
import {fetchProductSelected} from "../../store/actions/fetchProducts";
import {IProp} from "../../store/models/iProp";
import {IProduct} from "../../store/models/iProduct";

interface PathParamsType {
    id: string;
}
interface IStateProps {
    selectProduct:IProduct | undefined;
}
interface DispatchProps {
    fetchProductSelected: (id:number) => void
}
type TRoute = RouteComponentProps<PathParamsType>;
type TProductProps = IStateProps&TRoute;

class Product extends React.Component<TProductProps&DispatchProps> {
    componentDidMount(): void {
        const {id} = this.props.match.params;
        this.props.fetchProductSelected(+id);
    }
    render() {
        const {selectProduct} = this.props;
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
                {productProps ? showProps(productProps) : null}
                <div>
                    <h3>Стоимость</h3>
                    <p>{cost}$</p>
                </div>
            </>
        );

    }
}

const mapStateToProps = (state:IMapState):IStateProps => ({
    selectProduct: state.productsState.selectProduct
});

export const ProductContainer = connect(mapStateToProps, {fetchProductSelected})(Product);


