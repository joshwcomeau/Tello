import React from 'react';
import styled from 'react-emotion';

import { clearReduxData } from '../../helpers/local-storage.helpers';
import imageNormal from '../../images/google_button_normal@2x.png';

// In development, we need to specify the Node API URL.
// In production, the two are the same, and so this isn't necessary.
// TODO: Better solution!
const hrefPrefix =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3005' : '';
const authHref = `${hrefPrefix}/auth/google`;

const GoogleButton = () => (
  <a onClick={clearReduxData} href={authHref}>
    <GoogleImage src={imageNormal} />
  </a>
);

const GoogleImage = styled.img`
  width: 230px;

  &:active {
    opacity: 0.9;
  }
`;

export default GoogleButton;
