import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from '../../actions';
import { MODAL_IDS } from '../../constants';

import AddShow from '../AddShow';
import Modal from '../Modal';


const propTypes = {
  selectedModal: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
};

const getModalChildComponent = selectedModal => {
  switch (selectedModal) {
    case MODAL_IDS.addShow: return AddShow;
    default: return null;
  }
};

const RightModal = ({ selectedModal, hideModal }) => {
  const ModalChildComponent = getModalChildComponent(selectedModal);

  return (
    <Modal
      isVisible={!!selectedModal}
      handleClose={() => hideModal({ side: 'right' })}
    >
      {selectedModal && <ModalChildComponent />}
    </Modal>
  );
};

const mapStateToProps = state => ({
  selectedModal: state.modals.right,
})

RightModal.propTypes = propTypes;

export default connect(mapStateToProps, { hideModal })(RightModal);
