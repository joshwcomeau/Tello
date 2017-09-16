import React, { PureComponent } from 'react';
import styled from 'emotion/react';

import { BREAKPOINTS, COLORS, UNIT, UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Heading from '../Heading';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import Spacer from '../Spacer';
import TextInput from '../TextInput';





class ContactView extends PureComponent {
  render() {
    return (
      <StaticLayout
        title="Contact Tello"
      >
        <Paragraph size="large">
          I'd love to hear from you! Fill out the form below and I'll do my
          best to get back to you ASAP.
        </Paragraph>

        <Card>
          <form>
            <Row>
              <Field>
                <Label>
                  Your Name
                  <TextInput />
                </Label>
              </Field>
              <Field>
                <Label>
                  Your Email Address
                  <TextInput />
                </Label>
              </Field>
            </Row>

            <Row>
              <Field>
                <Label>
                  Your Message
                  <TextInput multiline />
                </Label>
              </Field>
            </Row>
          </form>

          <Divider />
        </Card>
      </StaticLayout>
    )
  }
}

const Card = styled.div`
  color: ${COLORS.gray.veryDark};
  background: ${COLORS.white};
  padding: ${UNITS_IN_PX[2]};
  max-width: 700px;
  margin: auto;

  @media ${BREAKPOINTS.sm} {
    padding: ${UNITS_IN_PX[1]};
  }
`;

const Row = styled.div`
  display: flex;
`;

const Field = styled.div`
  flex: 1;
  margin-bottom: 8px;

  @media ${BREAKPOINTS.desktop} {
    &:nth-of-type(2) {
      margin-left: ${UNITS_IN_PX[2]};
    }
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export default ContactView;
