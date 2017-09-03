import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { editShowRequest, hideModal } from '../../actions';
import { getTrackedShow } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Button from '../Button';


class EditShow extends Component {
  static propTypes = {
    initialShowData: ShowProps,
    editShowRequest: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  state = {
    // Copy our store from redux into local component state.
    // This is so we can do tentative mutations, without affecting the real
    // data. When the user saves their changes, we send them to the server,
    // and the server response updates the Redux store with the new data.
    show: this.props.initialShowData,
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        Editing {show.name}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialShowData: getTrackedShow(state, ownProps.showId),
});

const mapDispatchToProps = { editShowRequest, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(EditShow);
