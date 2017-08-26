import React, { Component } from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';
import { debounce } from '../../utils';


const propTypes = {
  onChange: PropTypes.func,
  changeDebounceTime: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
};

const defaultProps = {
  onChange: function() { /* no-op */ },
  changeDebounceTime: 0,
};

class TextInput extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    focused: false,
  }

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });
  handleChange = debounce(this.props.onChange, this.props.changeDebounceTime);

  render() {
    const { placeholder } = this.props;

    return (
      <Wrapper>
        <Input
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
  margin: ${UNITS_IN_PX[1]} 0;
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

// {/* <div className={css(styles.bottomBorder)} />
// <div
//   className={css(
//     styles.bottomBorderHighlight,
//     this.state.focused && styles.bottomBorderHighlightActive,
//     hasError && styles.bottomBorderHighlightError
//   )}
// /> */}

// input: {
//   background: 'transparent',
//   border: 'none',
//   padding: '12px 0',
//   marginTop: '10px',
//   outline: 'none',
//   fontSize: '14px',
//   color: gray800,
//   width: '100%',
// },
// bottomBorder: {
//   position: 'absolute',
//   zIndex: 1,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   height: '1px',
//   backgroundColor: gray500,
// },
// bottomBorderHighlight: {
//   position: 'absolute',
//   zIndex: 2,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   height: '2px',
//   backgroundColor: gray900,
//   transform: 'scaleX(0)',
// },
// bottomBorderHighlightActive: {
//   animationName: borderBottomHorizontalAnimation,
//   animationDuration: '500ms',
//   animationFillMode: 'forwards',
//   animationTimingFunction: 'cubic-bezier(.24,.75,.5,1.08)',
//   transformOrigin: 'left bottom',
// },

export default TextInput;
