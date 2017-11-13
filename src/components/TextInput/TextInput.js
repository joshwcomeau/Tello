import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';
import { debounce } from '../../utils';

class TextInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.oneOf(['text', 'email']),
    changeDebounceTime: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    focusOnMount: PropTypes.bool,
    multiline: PropTypes.bool,
  };

  static defaultProps = {
    onChange: function() {
      /* no-op */
    },
    changeDebounceTime: 0,
  };

  state = {
    focused: false,
  };

  componentDidMount() {
    if (this.props.focusOnMount) {
      this.elem.focus();
    }
  }

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });
  handleChange = debounce(this.props.onChange, this.props.changeDebounceTime);

  render() {
    const { multiline, type, placeholder } = this.props;

    const input = React.createElement(multiline ? Textarea : Input, {
      innerRef: elem => (this.elem = elem),
      placeholder,
      type,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: ev => this.handleChange(ev.target.value),
    });

    return (
      <Wrapper>
        {input}
        <BottomBorder />
        <BottomBorderHighlight isActive={this.state.focused} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const inputStyles = css`
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  font-size: 20px;
  color: ${COLORS.gray.veryDark};
  width: 100%;

  &::placeholder {
    color: ${COLORS.gray.light};
  }
`;

const Input = styled.input`
  ${inputStyles};
  height: ${UNITS_IN_PX[3]};
`;

const Textarea = styled.textarea`
  ${inputStyles};
  height: ${UNITS_IN_PX[8]};
  line-height: ${UNITS_IN_PX[2]};
  margin-top: 8px;
`;

const BottomBorder = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: ${COLORS.gray.dark};
`;

const BottomBorderHighlight = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background-color: ${COLORS.purple.primary};
  transform: ${props => (props.isActive ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: left bottom;
  transition: transform 400ms;
`;

export default TextInput;
