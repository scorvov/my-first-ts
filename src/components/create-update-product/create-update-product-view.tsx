import * as React from "react";
import {FieldArray, Form, FormikProps} from "formik";
import {IProduct} from "../../store/models/iProduct";
import {Link} from "react-router-dom";
import {Input} from "../common/input/input";
import {IProp} from "../../store/models/iProp";
import {Select} from "../common/select/select";
import {IProductCreate} from "./with-formik-product";
import {IPropsListStateProps} from "../props-list/container";

interface IUpdateProductView {
    rewriteProductProps: (props: IProp[], productProps: IProp[]) => void

}

export const CreateUpdateProductView: React.FC<any & IUpdateProductView & IPropsListStateProps & IProductCreate & FormikProps<IProduct>> = (props) => {
    const {touched, errors, isSubmitting, rewriteProductProps, propsList} = props;
    const {productProps} = props.values;
    props.values.productProps = rewriteProductProps(propsList.props, productProps);
/*    if(props.values.cost !== '') {
        props.values.cost = (+props.values.cost.replace(/\s/g, '')).toLocaleString();
    }*/
    return (<Form className="create-prop">
        <div className="group-buttons">
            <Link to="/products"
                  className="btn btn-danger btn-sm">
                Вернуться
            </Link>
            <button
                type={"submit"}
                disabled={isSubmitting}
                className="btn btn-success btn-sm">
                Сохранить
            </button>
        </div>
        <hr className="line"/>
        <h4>Добавление товара</h4>
        <hr className="line"/>
        <div className={"input-form"}>
            <Input
                label={"Название товара"}
                placeholder={"Mersedes S550 4matic"}
                name="name"
                error={errors.name}
                touched={touched.name}
            />
            <Input
                label={"Стоимость товара"}
                placeholder={"113 000"}
                name="cost"
                error={errors.cost}
                touched={touched.cost}
            />
            <Input
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
                error={errors.info}
                touched={touched.info}
            />
            <h5>Добавление товару свойств</h5>
            <br/>
            <FieldArray name={"productProps"} render={arrayHelpers => (
                <>
                    <button
                        type={"button"}
                        onClick={() => arrayHelpers.push({
                            id: Math.floor(Math.random() * 1000),
                            name: '',
                            type: '',
                            value: ''
                        })}>Add
                    </button>
                    {productProps && productProps.length > 0 &&
                    (productProps.map((productProp: IProp, index: number) => (
                        <span key={index} className={"add-props-product"}>
                                    <button type={"button"}
                                            onClick={() => arrayHelpers.remove(index)}>–
                                    </button>
                                    <Select
                                        name={`productProps[${index}].name`}
                                        component="select"
                                        label={"Свойство"}
                                    >
                                        {(productProps[index].name) ?
                                            (<option value={index} label={productProps[index].name}/>)
                                            : (<option value={-1} label={"Select"}/>)}
                                        {propsList.props.map((option: any) =>
                                            (!productProps.find((item: any) => item.name === option.name) ?
                                                <option key={option.id} value={option.name} label={option.name}/>
                                                : null))}
                                    </Select>
                                    <Input
                                        label={"Значение"}
                                        placeholder={"Введите значение свойства"}
                                        name={`productProps[${index}].value`}
                                        error={errors.productProps && errors.productProps[index] ? errors.productProps[index].value : null}
                                        touched={touched.productProps && touched.productProps[index] ? touched.productProps[index].value : null}
                                    />
                                </span>)))}
                </>
            )}/>
        </div>
    </Form>)
};
