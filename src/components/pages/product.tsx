import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {IProp} from "../../store/models/iProp";
import {IProduct} from "../../store/models/iProduct";
import {IMapState} from "../../store/models/iState";
import {fetchProductById} from "../../store/actions/fetchingActions";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {resetSelectProduct} from "../../store/actions/productActions";

interface PathParamsType {id: string;}
export interface ISelectProductProps {selectProduct:IProduct;}
interface DispatchProps {fetchProductById: (id:number) => void; resetSelectProduct: () => void;}
type TRoute = RouteComponentProps<PathParamsType>;
type TProductProps = ISelectProductProps&IFetchingState&TRoute;

class ProductContainer extends React.Component<TProductProps&DispatchProps> {
    componentDidMount(): void {
        const {id} = this.props.match.params;
        this.props.fetchProductById(+id);
    }
    componentWillUnmount(): void {
        this.props.resetSelectProduct();
    }

    render() {
        const {selectProduct, loading, error} = this.props;
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <ProductView selectProduct={selectProduct} />;
    }
}

const ProductView: React.FC<ISelectProductProps> = (props) => {
    const {name, cost, img, info, productProps} = props.selectProduct;
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
};

const mapStateToProps = ({dataState, fetchState}:IMapState):ISelectProductProps&IFetchingState => {
    const {selectProduct} = dataState;
    const {error, loading} = fetchState;
    return {selectProduct, error, loading};
};

export const Product = connect(mapStateToProps, {fetchProductById, resetSelectProduct})(ProductContainer);


