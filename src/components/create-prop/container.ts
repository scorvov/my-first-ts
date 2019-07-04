import {connect} from "react-redux";
import {propCreate} from "../../store/actions/propsActions";
import {MyEnhancedForm} from "./with-formik-prop";

export const CreatePropContainer = connect(null,
    {propCreate})(MyEnhancedForm);
