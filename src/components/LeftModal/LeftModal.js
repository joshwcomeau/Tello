import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { hideModal } from '../../actions';
import { getModalChildComponent } from '../Modal/Modal.helpers';

import Modal from '../Modal';


const propTypes = {
  selectedModal: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
};

const LeftModal = ({ selectedModal, hideModal }) => {
  const ModalChildComponent = getModalChildComponent(selectedModal);

  return (
    <Modal
      side="left"
      isVisible={!!selectedModal}
      handleClose={() => hideModal({ side: 'left' })}
    >
      {selectedModal && (
        React.createElement(ModalChildComponent, selectedModal.data)
      )}
    </Modal>
  );
};

const mapStateToProps = state => ({
  selectedModal: state.modals.left,
});

LeftModal.propTypes = propTypes;

export default connect(mapStateToProps, { hideModal })(LeftModal);
