import React, { useEffect } from 'react';
import Nested from './Nested.jsx';

const Button = (props) => {
  useEffect(() => {
    console.log('message updated', props.message);
  }, [props.message]);

  return (
    <div>
      <h1>{props.message}</h1>
      <Nested message={props.message}/>
    </div>
  );
};

export default Button;
