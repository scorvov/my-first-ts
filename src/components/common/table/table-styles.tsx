import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: 750,
        fontFamily: "inherit"
    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    name: {
        flexDirection: "row-reverse",
        paddingLeft: "70px"
    },
    headDefault: {
        flexDirection: "row-reverse",
        paddingLeft: "0px"
    },
    cellName: {
        paddingLeft: "95px"
    },
    cellDefault: {
        paddingLeft: "25px"
    },
    pagination: {
        flexShrink: 0,
        color: theme.palette.text.secondary
    }
}));