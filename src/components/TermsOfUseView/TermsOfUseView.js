import React from 'react';
import styled from 'react-emotion';

import { UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Heading from '../Heading';
import Paragraph from '../Paragraph';

const TermsOfUseView = () => (
  <StaticLayout title="Terms of Use">
    <Section>
      <Heading theme="vibrantAlt" size="small">
        Short and sweet
      </Heading>
      <Paragraph>
        By using Tello, you agree not to use the information provided by Tello
        in an unlawful way, according to your jurisdiction, or the laws of
        Canada and the United States of America.
      </Paragraph>

      <Paragraph>
        Tello may be shut down at any point without notice (this is just a
        side-project), and the owner makes no guarantees about being able to
        recover and provide your TV-tracking data.
      </Paragraph>
    </Section>
  </StaticLayout>
);

const Section = styled.div`
  margin: ${UNITS_IN_PX[3]} auto;
  max-width: 700px;
`;

export default TermsOfUseView;
