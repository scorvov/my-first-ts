import * as React from "react";
import {Link} from "react-router-dom";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IPropsFetchingState} from "../../store/reducers/propsFetchReducer";
import {connect} from "react-redux";
import {IProp} from "../../store/models/iProp";
import {propDeleted} from "../../store/actions/fetchProps";
import "../../assests/list.scss"

interface IPropsList {
    propsList: IProp[];
    propDeleted: (id:number) => void;
}
const PropsList: React.FC<IPropsList> = ({propsList, propDeleted}) => {
    const renderRow = ((prop: IProp) => {
        const {id, name, type} = prop;
        return (
            <tr key={id}>
                <td> </td>
                <td>{name}</td>
                <td>{type}</td>
                <td >
                    <button onClick={() => propDeleted(id)} className="link">
                        Удалить
                    </button>
                </td>
            </tr>
        )
    });
    return (
        <div className="list">
                <Link to="/prop/create" className="btn btn-warning btn-sm" >Добавить свойство</Link>
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

    render() {
        const {propsList, loading, error,propDeleted} = this.props;
        if (loading) {
            return <Spinner />
        }
        if(error) {
            return <ErrorIndicator />
        }
        return <PropsList
            propDeleted={propDeleted}
            propsList={propsList}/>
    }
}
interface IMapState {
    propsState:IPropsFetchingState;
}
const mapStateToProps = ({propsState}:IMapState):IPropsFetchingState => {
    const {propsList, loading, error} = propsState;
    return {propsList, loading, error}
};

export default connect(mapStateToProps, {propDeleted})(PropsListContainer);


