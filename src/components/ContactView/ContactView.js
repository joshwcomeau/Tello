import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { BREAKPOINTS, COLORS, UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Button from '../Button';
import Heading from '../Heading';
import Divider from '../Divider';
import Paragraph from '../Paragraph';
import TextInput from '../TextInput';

class ContactView extends PureComponent {
  state = {
    name: '',
    email: '',
    message: '',
    submitted: false,
  };

  updateField = field => val => {
    this.setState({ [field]: val });
  };

  updateName = this.updateField('name');
  updateEmail = this.updateField('email');
  updateMessage = this.updateField('message');

  handleSubmit = ev => {
    ev.preventDefault();

    if (!this.state.name || !this.state.email || !this.state.message) {
      alert('All fields are required! Please fill them out and try again.');
      return;
    }

    const fetchOpts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };

    fetch('https://formspree.io/joshwcomeau@gmail.com', fetchOpts)
      .then(response => response.json())
      .then(json => {
        this.setState({
          submitted: true,
        });
      });
  };

  renderForm() {
    if (this.state.submitted) {
      return (
        <Heading size="small" theme="vibrant">
          Thanks! Message received.
        </Heading>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Field>
            <Label>
              Your Name
              <TextInput placeholder="John Doe" onChange={this.updateName} />
            </Label>
          </Field>
          <Field>
            <Label>
              Your Email Address
              <TextInput
                type="email"
                placeholder="person@place.com"
                onChange={this.updateEmail}
              />
            </Label>
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>
              Your Message
              <TextInput multiline onChange={this.updateMessage} />
            </Label>
          </Field>
        </Row>

        <Divider />

        <ButtonWrapper>
          <Button>Submit</Button>
        </ButtonWrapper>
      </form>
    );
  }

  render() {
    return (
      <StaticLayout title="Contact Tello">
        <Paragraph size="large">
          I'd love to hear from you! Fill out the form below and I'll do my best
          to get back to you ASAP.
        </Paragraph>

        <Card>{this.renderForm()}</Card>
      </StaticLayout>
    );
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

const ButtonWrapper = styled.div`
  text-align: right;
`;

export default ContactView;
