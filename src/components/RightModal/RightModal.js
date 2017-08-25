import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from '../../actions';
import Modal from '../Modal';


const propTypes = {
  selectedModal: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
};

const RightModal = ({ selectedModal, hideModal }) => {
  return (
    <Modal
      isVisible={!!selectedModal}
      handleClose={() => hideModal({ side: 'right' })}
    >
      Right side!
    </Modal>
  );
};

const mapStateToProps = state => ({
  selectedModal: state.modals.right,
})

RightModal.propTypes = propTypes;

export default connect(mapStateToProps, { hideModal })(RightModal);
