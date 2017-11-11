import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { COLORS, MODAL_BG_COLOR } from '../../constants';

import Scrollbars from '../Scrollbars';

class LoggedInScrollbars extends PureComponent {
  static propTypes = {
    isRightModalOpen: PropTypes.bool.isRequired,
  };

  state = {
    light: false,
  };

  // Create these objects once, so that re-renders don't create new objects,
  // and throw off the Scrollbars' PureComponent logic.
  scrollbarStyles = { width: '8px' };
  scrollbarTrackStylesDark = { background: COLORS.gray.veryDark };
  scrollbarTrackStylesLight = { background: MODAL_BG_COLOR };
  scrollbarThumbStylesDark = { background: COLORS.purple.primary };
  scrollbarThumbStylesLight = { background: MODAL_BG_COLOR };

  componentDidUpdate(prevProps) {
    // If we just opened the modal, update the state immediately.
    if (!prevProps.isRightModalOpen && this.props.isRightModalOpen) {
      this.setState({ light: true });
    }
    // If we just closed the modal, wait until it's finished closing and then
    // revert the logic.
    // TODO: This should really use React Motion's onComplete hook, in the modal.
    // I should introduce a 'transient' state to the modal, where it's not `null`,
    // but it's closing...
    if (prevProps.isRightModalOpen && !this.props.isRightModalOpen) {
      window.setTimeout(() => {
        this.setState({ light: false });
      }, 900);
    }
  }

  render() {
    // Our modals have an off-white background. When the right modal is open,
    // the dark scrollbar stands out like a sore thumb, so let's colour it to
    // match the modal, when it's open.
    const trackStyles = this.state.light
      ? this.scrollbarTrackStylesLight
      : this.scrollbarTrackStylesDark;

    const thumbStyles = this.state.light
      ? this.scrollbarThumbStylesLight
      : this.scrollbarThumbStylesDark;

    return (
      <Scrollbars
        scrollbarStyles={this.scrollbarStyles}
        scrollbarTrackStyles={trackStyles}
        scrollbarThumbStyles={thumbStyles}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRightModalOpen: !!state.modals.right,
});

export default connect(mapStateToProps)(LoggedInScrollbars);
