import React, { Component } from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';
import { debounce } from '../../utils';


class TextInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    changeDebounceTime: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    focusOnMount: PropTypes.bool,
  }

  static defaultProps = {
    onChange: function() { /* no-op */ },
    changeDebounceTime: 0,
  }

  state = {
    focused: false,
  }

  componentDidMount() {
    if (this.props.focusOnMount) {
      this.elem.focus();
    }
  }

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });
  handleChange = debounce(this.props.onChange, this.props.changeDebounceTime);

  render() {
    const { placeholder } = this.props;

    return (
      <Wrapper>
        <Input
          innerRef={elem => this.elem = elem}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={ev => this.handleChange(ev.target.value)}
        />
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

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  height: ${UNITS_IN_PX[3]};
  padding: 0;
  font-size: 20px;
  color: ${COLORS.gray.veryDark};
  width: 100%;

  &::placeholder {
    color: ${COLORS.gray.light};
  }
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
  transform: ${props => props.isActive ? 'scaleX(1)' : 'scaleX(0)'};
  transform-origin: left bottom;
  transition: transform 400ms;
`;

export default TextInput;
