import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { saveStats } from "../actions/index";
import LocalStats from "./LocalStats";
import { statsCalculator } from "../helpers/helpers";

// material ui styling for inputs in this component, uses muitheme as argument
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  button: {
    marginRight: "4px"
  }
});

class ApiStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.data !== this.props.users.data) {
      const stats = statsCalculator({ ...nextProps.users });
      this.setState({
        stats
      });
    }

    if (nextProps.users.row !== this.props.users.row) {
      let newStats = this.state.stats.filter(
        (item, index) => index !== nextProps.users.rowId
      );
      this.setState({
        stats: newStats
      });
    }
  }

  // Fetch users from API
  handleCallApiButtonClick = event => {
    this.props.handleFetchApi();
  };

  // save button click handler. saves data to into localstorage
  handleSaveStats = rowId => () => {
    let stat = [...this.state.stats];
    this.props.saveStats(stat[rowId], rowId);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Button
          size="large"
          variant="contained"
          onClick={this.handleCallApiButtonClick}
          color="secondary"
        >
          load random user
        </Button>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead color="primary">
              <TableRow>
                <TableCell align="center">Average Age</TableCell>
                <TableCell align="center">Oldest Age,Name</TableCell>
                <TableCell align="center">Youngest Age,Name</TableCell>
                <TableCell align="center">Location Northern</TableCell>
                <TableCell align="center">Location Southern</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.stats &&
                this.state.stats.map((row, index) => (
                  <TableRow key={index} hover={true} className={classes.row}>
                    <TableCell align="center" component="th" scope="row">
                      {row.averageAge}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.oldest.name.first +
                        " " +
                        row.oldest.name.last +
                        ", " +
                        row.oldest.age}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.youngest.name.first +
                        " " +
                        row.youngest.name.last +
                        ", " +
                        row.youngest.age}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.mostNorthern.location +
                        ", " +
                        row.mostNorthern.name.first +
                        " " +
                        row.mostNorthern.name.last}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.mostSouthern.location +
                        ", " +
                        row.mostSouthern.name.first +
                        " " +
                        row.mostSouthern.name.last}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={this.handleSaveStats(index)}
                        color="secondary"
                        className={classes.button}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
        <LocalStats stats={this.props.users.stats} />
      </React.Fragment>
    );
  }
}

// map redux store
function mapStateToProps(state) {
  return {
    users: state.users
  };
}

/*Prop types should be added here for better debugging, avoided now */

export default connect(
  mapStateToProps,
  { saveStats }
)(withStyles(styles)(ApiStats));
