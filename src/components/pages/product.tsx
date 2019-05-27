import * as React from "react";
import {Link, Redirect} from "react-router-dom";
import {IMapState} from "./products-list";
import {connect} from "react-redux";
import {productSelected} from "../../store/actions/fetchProducts";
import {IProp} from "../../store/models/iProp";


export class Product extends React.Component<any> {
    componentWillMount(): void {
        const {productSelected, itemId} = this.props;
            productSelected(itemId);
    }

    showProps = (props:IProp[]) => {
        if(props) {
            return props.map((item:IProp) => {
                const {id, name,type,value} = item;
                let valueProp;
                if(type === 'dropdown') {
                    valueProp = <select><option>{value}</option></select>
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
    render() {
        const {isLoggedIn, selectProduct} = this.props;
        if (isLoggedIn) {
            if (!selectProduct) {
                return <div>Loading...</div>;
            }
                const {name, cost, img, info, props} = selectProduct;
                return (
                    <>
                        <Link to="/products"
                              className="link">
                            Вернуться
                        </Link>
                        <span>
                <img
                    src={img}
                    alt="auto"/>
                <h2>{name}</h2>
                <div><p>{info}</p></div>
            </span>
                        {this.showProps(props)}
                        <div>
                            <h3>Стоимость</h3>
                            <p>{cost}$</p>
                        </div>
                    </>
                );
            }

        return <Redirect to="/login"/>;
    }
}

const mapStateToProps = ({productsState:{selectProduct}}:IMapState) => {
    return {selectProduct}
};
const mapDispatchToProps = {
        productSelected
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
