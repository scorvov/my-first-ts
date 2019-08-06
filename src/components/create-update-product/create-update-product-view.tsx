import * as React from "react";
import {FieldArray, Form, FormikProps} from "formik";
import {IProduct} from "../../store/models/iProduct";
import {Input} from "../common/input/input";
import {IProp} from "../../store/models/iProp";
import {IProductCreate} from "./with-formik-product";
import {IPropsListStateProps} from "../props-list/container";
import {Container, IconButton, Select} from "@material-ui/core";
import "../../assests/styles/create-product-prop.scss"
import Button from "@material-ui/core/Button";
import Add from '@material-ui/icons/AddCircleOutline';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import {Link} from "react-router-dom";

interface IUpdateProductView {
    rewriteProductProps: (props: IProp[], productProps: IProp[]) => void
}

export const CreateUpdateProductView: React.FC<any & IUpdateProductView & IPropsListStateProps & IProductCreate & FormikProps<IProduct>> = (props) => {
    const {touched, errors, isSubmitting, rewriteProductProps, propsList} = props;
    const {productProps} = props.values;
    const header = (props.values.id !== 0) ? "Редактирование товара" : "Добавление товара";
    props.values.productProps = rewriteProductProps(propsList.props, productProps);
    /*    if(props.values.cost !== '') {
            props.values.cost = (+props.values.cost.replace(/\s/g, '')).toLocaleString();
        }*/
    return (
        <Container className="create-container">
            <Form className="form">
                <div className="group-buttons">
                    <Link to={"/products"} className={"wr-link"}>
                        <Button variant="contained"
                                className={"back"}>
                            Вернуться
                        </Button>
                    </Link>
                    <Button
                        type={"submit"}
                        variant="contained"
                        disabled={isSubmitting}
                        className={"save"}>
                        Сохранить
                    </Button>
                </div>
                <hr className="line"/>
                <p className={"header"}>{header}</p>
                <hr className="line"/>
                <div className={"input-form"}>
                    <Input
                        required
                        label={"Название товара"}
                        placeholder={"Mersedes S550 4matic"}
                        name="name"
                        error={errors.name}
                        touched={touched.name}
                    />
                    <Input
                        required
                        label={"Стоимость товара"}
                        placeholder={"113 000"}
                        name="cost"
                        error={errors.cost}
                        touched={touched.cost}
                    />
                    <Input
                        required
                        label={"Изображение"}
                        placeholder={"image"}
                        name="img"
                        error={errors.img}
                        touched={touched.img}
                    />
                    <Input
                        component="textarea"
                        cols="80"
                        rows="5"
                        label={"Описание"}
                        placeholder={"info"}
                        name="info"
                    />
                    <hr className="line"/>
                    <FieldArray name={"productProps"} render={arrayHelpers => (
                        <div className={"field-array"}>
                            <p className={"header"}>Добавление товару свойств
                                <IconButton
                                    size={"small"}
                                    className={"add-button"}
                                    style={{color: '#0258FF'}}
                                    onClick={() => arrayHelpers.push({
                                        id: Math.floor(Math.random() * 1000),
                                        name: '',
                                        type: '',
                                        value: ''
                                    })}><Add/>
                                </IconButton></p>
                            <hr className="line"/>
                            {(productProps.map((productProp: IProp, index: number) =>
                                (<span key={index} className={"create-props"}>
                                    <IconButton
                                        className={"remove"}
                                        size={"small"}
                                        style={{color: '#0258FF'}}
                                        onClick={() => arrayHelpers.remove(index)}>
                                        <Remove/>
                                    </IconButton>
                                    <Input
                                        name={`productProps[${index}].name`}
                                        component={"select"}
                                        label={`Свойство ${index + 1}`}
                                    >
                                        {(productProps[index].name) ?
                                            (<option value={index} label={productProps[index].name}/>)
                                            : (<option value={-1} label={"Select"}/>)}
                                        {propsList.props.map((option: IProp) =>
                                            (!productProps.find((item: IProp) => item.name === option.name) ?
                                                <option key={option.id} value={option.name} label={option.name}/>
                                                : null))}
                                    </Input>
                                    <Input
                                        label={"Значение"}
                                        placeholder={"Введите значение свойства"}
                                        name={`productProps[${index}].value`}
                                        error={errors.productProps && errors.productProps[index] ? errors.productProps[index].value : null}
                                        touched={touched.productProps && touched.productProps[index] ? touched.productProps[index].value : null}
                                    />
                                </span>)))}
                        </div>
                    )}/>
                </div>
            </Form>
        </Container>)
};
