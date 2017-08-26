import React, { Component } from 'react';

import Heading from '../Heading';
import TextInput from '../TextInput';


class AddShow extends Component {
  render() {
    return (
      <div>
        <Heading>Add New Show</Heading>

        <TextInput changeDebounceTime={300} />
      </div>
    );
  }
}

export default AddShow;
