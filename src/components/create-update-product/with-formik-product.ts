import {withFormik} from "formik";
import {IProduct} from "../../store/models/iProduct";
import * as Yup from "yup";
import {CreateUpdateProductView} from "./create-update-product-view";
import {IProp} from "../../store/models/iProp";
import {ISelectProduct} from "../product/container";

export interface IProductCreate {
    productAction: (values: IProduct) => void;
    history: {
        push(url:string): void
    }
}
interface  ICreatePropsValues {
    id: number;
    name: string;
    cost: string;
    img: string;
    info: string;
    dateUp: Date;
    productProps: IProp[];
}

export const EnhancedCreateUpdateProductView = withFormik<any & ISelectProduct & IProductCreate, ICreatePropsValues>({
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
            .required("Требуется указать ссылку файла"),
        info: Yup.string()
            .max(1000, "Описание не должно превышать 1000 символов"),
        productProps: Yup.array().of(
            Yup.object().shape({
                value: Yup.string()
                    .required("Требуется ввести свойство"),
                name: Yup.string()
                    .required("Требуется ввести имя")
            }))
    }),
    mapPropsToValues: ({selectProduct}) => {
        const cost = (selectProduct.cost === 0) ? '' : selectProduct.cost.toLocaleString();
        return {...selectProduct,
            cost}
    },
    handleSubmit: (values, {props: {productAction, history}, resetForm, setSubmitting}) => {
        productAction({...values,
            dateUp: new Date(),
            cost: +values.cost.replace(/\s/g, '')
        });
        resetForm();
        setSubmitting(false);
        history.push('/products');
    }
})(CreateUpdateProductView);
