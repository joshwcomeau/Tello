import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPopulatedShowData } from '../../selectors';

import BacklogRow from '../BacklogRow';


class Backlog extends Component {
  componentDidMount() {
    // TODO: If we aren't logged in, redirect to a login page.
  }

  render() {
    return null;
    // return <BacklogRow show={stub} />;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  shows: getPopulatedShowData(state),
});

export default connect(mapStateToProps)(Backlog);
