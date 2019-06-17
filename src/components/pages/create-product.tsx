import * as React from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import "../pages/create-product.scss";
import {Input} from "../common/input/input";
import {Form, FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {productCreated} from "../../store/actions/fetchProducts";
import {ILogin} from "./main-page";
import {IPropsFetchingState} from "../../store/reducers/propsFetchReducer";
import {IProp} from "../../store/models/iProp";
import {Select} from "../common/select/select";


type ProductProps = IProp[] | [];

export interface ICreateProductValues {
    name: string;
    cost: string;
    img: string;
    info: string;
    dateUp: string;
    productProps?: ProductProps;
}

const CreateProductView: React.FC<ILogin & any & IPropsFetchingState & FormikProps<ICreateProductValues>> = (props) => {
    const {
        isLoggedIn,
        touched,
        errors,
        propsList,
        isSubmitting
    } = props;
    let {productProps} = props.values;
    console.log(productProps);
    // запись id и type объекта property в массив productProps по name из propsList
    if(productProps.length !== 0){
        productProps.map((propProduct:any) => {
            propsList.map((prop:any) => {
                if(propProduct.name === prop.name){
                    propProduct.id = prop.id;
                    propProduct.type = prop.type;
                }
            });
            return propProduct;
        })
    }
    const addProp = () => {
        if(!productProps) {
        }
        productProps.push({id: undefined, name:'', type: '', value: ''});
    };
    const productPropsShow = ((productProp: IProp, index: number) => {
        // console.log(productProps);
        return (<span key={index} className={"add-props-product"}>
                <Select
                    name={`productProps[${index}].name`}
                    component="select"
                    label={"Свойство"}
                >
                    <option value={0} label={"select"} />
                    {propsList.map(optionRow)}
                </Select>
                <Input
                    label={"Значение"}
                    placeholder={"Введите значение свойства"}
                    name={`productProps[${index}].value`}
                    // error={errors.productProps ? errors.productProps[index].value : null}
                    // touched={touched.productProps ? touched.productProps[index].value : null}
                />
            </span>)
    });
    const optionRow = (option: IProp) => {
        return (
            <option key={option.id} value={option.name} label={option.name}/>
        )
    };
    if (isLoggedIn) {
        if ((errors.cost) && errors.cost.includes("cost must")) {
            errors.cost = "Стоимость должна состоять из цифр"
        }
        return (
            <Form className="create-prop">
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
                    <div>
                        <h5>Добавление товару свойств</h5>
                        <button type="submit" onClick={addProp}>Add
                        </button>
                        <br/>
                        {productProps.map(productPropsShow)}
                    </div>
                </div>

            </Form>
        );
    }
    return <Redirect to="/login"/>;
};

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Название свойство должно быть не менее 2 символов")
            .max(30, "Слишком длинное название")
            .required("Требуется ввести название"),
        cost: Yup.number()
            .min(1000, "Стоимость должна быть не менее 1 000 $")
            .max(1000000, "Стоимость не должна превышать 1 000 000 $")
            .integer("Стоимость должна быть целым числом")
            .required("Требуется ввести стоимость"),
        img: Yup.string()
            .min(2, "Ссылка файла изображения должна быть не менее 2 символов")
            .required("Требуется указать ссылку файла изображения"),
        info: Yup.string()
            .max(1000, "Описание не должно превышать 1000 символов"),
        productProps: Yup.array().of(
            Yup.object().shape({
                value: Yup.string()
                    .required("Требуется ввести свойство"),
                name: Yup.string()
                    .required("Требуется ввести имя")
            })
        )


    }),

    mapPropsToValues: ({name, cost, img, info, color, productProps}: any) => ({
            name: name || '',
            cost: cost || '',
            img: img || '',
            info: info || '',
            color: color || '',
            productProps: productProps || [],
            dateUp: new Date().toLocaleDateString()
        }),
    handleSubmit: (values: any, {props: {productCreated}, resetForm, setSubmitting}) => {
        productCreated(values);
        resetForm();
        setSubmitting(false);
    },
})(CreateProductView);

const mapStateToProps = ({propsState}: any): IPropsFetchingState => {
    const {propsList} = propsState;
    return {propsList}
};
const mapDispatchToProps = {
    productCreated
};
export const CreateProduct = connect(mapStateToProps, mapDispatchToProps)(formikEnhancer);

