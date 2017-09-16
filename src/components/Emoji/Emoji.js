import React from 'react';


const Emoji = ({ name, children, size }) => (
  <span role="img" aria-label={name} style={{ fontSize: size }}>
    {children}
  </span>
);


export default Emoji;
