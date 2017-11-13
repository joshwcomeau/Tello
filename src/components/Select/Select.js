import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';

class Select extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.object,
    selectedOption: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
  };

  render() {
    const { label, options, selectedOption, handleChange } = this.props;

    const optionsArray = Object.keys(options).map(optionValue => ({
      value: optionValue,
      children: options[optionValue],
    }));

    const selectedOptionLabel = options[selectedOption];

    return (
      <SelectWrapper>
        <Label>{label}:</Label>

        <SelectElem
          value={selectedOption}
          onChange={ev => handleChange(ev.target.value)}
        >
          {optionsArray.map(({ value, children }) => (
            <option key={value} value={value}>
              {children}
            </option>
          ))}
        </SelectElem>

        <SelectPresentation>
          {selectedOptionLabel}
          <Caret />
        </SelectPresentation>
      </SelectWrapper>
    );
  }
}

const accentColor = COLORS.blue.primary;

const SelectWrapper = styled.div`
  display: block;
  position: relative;
  height: ${UNITS_IN_PX[2]};
`;

const Label = styled.span`
  display: inline-block;
  margin-right: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.light};
  font-size: 14px;
`;

const SelectElem = styled.select`
  opacity: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  cursor: pointer;
`;

const SelectPresentation = styled.span`
  display: inline-block;
  padding: 6px;
  padding-right: 26px;
  border-bottom: 2px solid ${accentColor};
  pointer-events: none;
`;

const Caret = styled.div`
  position: absolute;
  right: 6px;
  bottom: 12px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${accentColor};
`;

export default Select;
