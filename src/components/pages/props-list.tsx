import * as React from "react";
import {Link} from "react-router-dom";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IPropsFetchingState} from "../../store/reducers/propsFetchReducer";
import {Dispatch} from "redux";
import {compose} from "../../utils/compose";
import {withCarstoreService} from "../hoc";
import {connect} from "react-redux";
import {IProp} from "../../store/models/iProp";
import {IPropsLoaded, propsError, propsLoaded, propsRequested} from "../../store/actions/fetchProps";
import "../../assests/list.scss"

interface IPropsList {
    propsList: IProp[];
}
const PropsList: React.FC<IPropsList> = ({propsList}) => {
    const renderRow = ((prop: IProp) => {
        const {id, name, type} = prop;
        return (
            <tr key={id}>
                <td> </td>
                <td>{name}</td>
                <td>{type}</td>
                <td >
                    <Link to ="/products" className="link">Ред</Link>
                    <Link to="/products" className="link">
                        Удалить
                    </Link>
                </td>
            </tr>
        )
    });
    return (
        <div className="list">
                <Link to="/prop/create" className="add btn btn-warning btn-sm" >Добавить свойство</Link>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Перечень свойств</th>
                    <th>Тип</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                { propsList.map(renderRow) }
                </tbody>
            </table>
        </div>
    );
};

export class PropsListContainer extends React.Component<any> {
    componentDidMount() {
        if(!this.props.propsList.length) {
            this.props.fetchProps();
        }
    }
    render() {
        const {propsList, loading, error} = this.props;
        if (loading) {
            return <Spinner />
        }
        if(error) {
            return <ErrorIndicator />
        }
        return <PropsList propsList={propsList}/>
    }
}
interface IMapState {
    propsState:IPropsFetchingState;
}
const mapStateToProps = ({propsState}:IMapState):IPropsFetchingState => {
    const {propsList, loading, error} = propsState;
    return {propsList, loading, error}
};
const mapDispatchToProps = (dispatch:Dispatch, ownProps: any) => {
    const {carstoreService} = ownProps;
    return {
        fetchProps: () => {
            dispatch(propsRequested());
            carstoreService.getProps()
                .then((data: IProp[]):IPropsLoaded => dispatch(propsLoaded(data)))
                .catch((err:string) => dispatch(propsError(err)));
        }
    }
};

export default compose(
    withCarstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PropsListContainer);


