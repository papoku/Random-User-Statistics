import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { loadUserList } from '../actions/index';
import Header from './Header';


// material ui styling for inputs in this component, uses muitheme as argument
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        }
    },
    header:{
        marginBottom: 10,
        alignItems: 'center'
    }
});



class LocalStats extends Component {

    componentDidMount() {
        this.props.loadUserList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.row !== this.props.row) {
            this.props.loadUserList();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Header header={classes.header} content='Stats Loaded From Local API Server' colors='light' />
                <Table className={classes.table}>
                    <TableHead color="primary">
                        <TableRow >
                            <TableCell align="center">Average Age</TableCell>
                            <TableCell align="center">Oldest Age,Name</TableCell>
                            <TableCell align="center">Youngest Age,Name</TableCell>
                            <TableCell align="center">Location Northern</TableCell>
                            <TableCell align="center">Location Southern</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.stats && this.props.stats.map((row, index) => (
                            <TableRow key={index} hover={true} className={classes.row}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.averageAge}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.oldest.name.first + ' ' + row.oldest.name.last + ', ' + row.oldest.age}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.youngest.name.first + ' ' + row.youngest.name.last + ', ' + row.youngest.age}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.mostNorthern.location + ', ' + row.mostNorthern.name.first + ' ' + row.mostNorthern.name.last}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.mostSouthern.location + ', ' + row.mostSouthern.name.first + ' ' + row.mostSouthern.name.last}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


// map reuired data from redux store
function mapStateToProps(state) {
    return {
        row: state.users.row
    };
}

export default connect(mapStateToProps, { loadUserList })(withStyles(styles)(LocalStats));