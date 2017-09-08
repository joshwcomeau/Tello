// Utility component that computes the current breakpoint and passes it down
// to children.
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { debounce } from '../../utils';
import { getBreakpointFor } from '../../helpers/responsive.helpers';


class MediaQuery extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    breakpoint: getBreakpointFor(window.innerWidth),
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.setState({ breakpoint: getBreakpointFor(window.innerWidth) });
  }, 250)

  render() {
    return this.props.children(this.state.breakpoint);
  }
}

export default MediaQuery;
