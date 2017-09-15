import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import imageNormal from '../../images/google_button_normal@2x.png';
import imagePressed from '../../images/google_button_pressed@2x.png';

import Button from '../Button';


// In development, we need to specify the Node API URL.
// In production, the two are the same, and so this isn't necessary.
// TODO: Better solution!
const hrefPrefix = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3005'
  : '';
const authHref = `${hrefPrefix}/auth/google`;

const propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node,
  official: PropTypes.bool,
};

const defaultProps = {
  color: 'red',
  size: 'medium',
  children: 'Login With Google',
};

class OfficialGoogleButton extends PureComponent {
  state = {
    // 'normal' | 'pressed'
    buttonState: 'normal',
  }

  getImageSrc = (state) => {
    switch (state) {
      case 'pressed': return imagePressed;
      case 'normal':
      default:
        return imageNormal;
    }
  }

  handlePress = () => this.setState({ buttonState: 'pressed' });
  handleRelease = () => this.setState({ buttonState: 'normal' });

  render() {

    return (
      <a href={authHref}>
        <GoogleImage
          onMouseDown={this.handlePress}
          onMouseUp={this.handleRelease}
          onMouseLeave={this.handleRelease}
          src={this.getImageSrc(this.state.buttonState)}
        />
      </a>
    )
  }
}

const GoogleButton = (props) => (
  props.official
    ? <OfficialGoogleButton />
    : <Button external href={authHref} {...props} />
);

const GoogleImage = styled.img`
  width: 191px;
`;

GoogleButton.propTypes = propTypes;
GoogleButton.defaultProps = defaultProps;

export default GoogleButton;
