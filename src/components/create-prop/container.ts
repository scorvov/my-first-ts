import {connect} from "react-redux";
import {propCreate} from "../../store/actions/propsActions";
import {MyEnhancedForm} from "./with-formik-prop";
import {withRouteRedirect} from "../../hoc/withAuthRedirect";

export const CreatePropContainer = connect(null,
    {propCreate})(withRouteRedirect(MyEnhancedForm));
