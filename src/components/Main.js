import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList } from '../actions/index';
import ApiStats from './ApiStats';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.users !== this.state.users && this.setState({ users: nextProps.users });
  }

  handleFetchApi = () => {
    this.props.fetchUserList();
  }

  render() {
    return (
      <React.Fragment>
        <ApiStats tableData={this.props.data} handleFetchApi={this.handleFetchApi.bind(this)} />
      </React.Fragment>
    );
  }
}

// map users data from redux store
function mapStateToProps(state) {
  return {
    users: state.users.data
  };
}

/*Prop types should be added here for better debugging, avoided now */

export default connect(mapStateToProps, { fetchUserList })(Main);
