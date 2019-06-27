import * as React from "react";
import {Link} from "react-router-dom";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {connect} from "react-redux";
import {IProp, IPropsList} from "../../store/models/iProp";
import {propDelete} from "../../store/actions/propsActions";
import "../../assests/list.scss"
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetchingReducer";

interface IDispatchProps {propDelete: (id:number) => void;}

const PropsList: React.FC<IPropsList&IDispatchProps> = ({propsList, propDelete}) => {
    const renderRow = ((prop: IProp) => {
        const {id, name, type} = prop;
        return (
            <tr key={id}>
                <td> </td>
                <td>{name}</td>
                <td>{type}</td>
                <td >
                    <button onClick={() => propDelete(id)} className="link">
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

class PropsListContainer extends React.Component<IPropsList&IDispatchProps&IFetchingState> {
    render() {
        const {propsList, loading, error,propDelete} = this.props;
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <PropsList
            propDelete={propDelete}
            propsList={propsList}/>
    }
}

const mapStateToProps = ({dataState, fetchState}:IMapState):IPropsList&IFetchingState => {
    const {propsList} = dataState;
    const {loading, error} = fetchState;
    return {propsList, loading, error}
};

export default connect(mapStateToProps, {propDelete})(PropsListContainer);


