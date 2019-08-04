import {makeStyles} from "@material-ui/core";


export const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));

export const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: 750,
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));