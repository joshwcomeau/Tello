import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { UNITS_IN_PX } from '../../constants';
import { getUser } from '../../reducers/auth.reducer';

import Button from '../Button';
import Heading from '../Heading';


const SettingsView = ({ user }) => {
  return [
    <Section key="account">
      <Heading theme="vibrant" size="small">Account Settings</Heading>
      <Paragraph>
        Logged in as <strong>{user.name}</strong>
        {' '}
        (<em>{user.email}</em>).
      </Paragraph>

      <Button color="red" size="small">
        Log Out
      </Button>
    </Section>,

    <Section key="notifications">
      <Heading theme="vibrant" size="small">Notification Settings</Heading>
      <Paragraph>
        Coming soon!
      </Paragraph>
    </Section>
  ];
};

const Section = styled.div`
  padding-top: ${UNITS_IN_PX[2]};
  padding-bottom: ${UNITS_IN_PX[2]};
`;

const Paragraph = styled.p`
  font-size: 17px;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(SettingsView);
