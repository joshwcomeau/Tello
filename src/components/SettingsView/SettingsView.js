import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';
import { clearReduxData } from '../../helpers/local-storage.helpers';
import { getUser } from '../../reducers/auth.reducer';

import Button from '../Button';
import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';

const SettingsView = ({ user }) => {
  return [
    <Spacer key="spacer" size={UNIT * 4} />,
    <Section key="account">
      <Heading theme="vibrant" size="small">
        Account Settings
      </Heading>
      <Paragraph>
        Logged in as <strong>{user.name}</strong> (<em>{user.email}</em>).
      </Paragraph>

      <Button href="/logout" onClick={clearReduxData} color="red" size="small">
        Log Out
      </Button>
    </Section>,

    <Section key="notifications">
      <Heading theme="vibrant" size="small">
        Notification Settings
      </Heading>
      <Paragraph>Coming soon!</Paragraph>
    </Section>,
  ];
};

const Section = styled.div`
  padding: ${UNITS_IN_PX[1]};
  margin-bottom: ${UNITS_IN_PX[1]};
  background: ${COLORS.white};
  color: ${COLORS.gray.veryDark};

  &:last-child {
    margin-bottom: 0;
  }
`;

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(SettingsView);
