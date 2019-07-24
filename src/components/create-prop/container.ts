import {connect} from "react-redux";
import {MyEnhancedForm} from "./with-formik-prop";
import {withRouteRedirect} from "../../hoc/withAuthRedirect";
import {itemCreate} from "../../store/actions/data-actions";

export const CreatePropContainer = connect(null,
    {itemCreate})(withRouteRedirect(MyEnhancedForm));
