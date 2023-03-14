import React, { useRef } from 'react';

const Nested = (props) => {
  const ref = useRef(null);

  return (
    <>
      <button
        ref={ref}
        onClick={(event) => {
          ref.current.dispatchEvent(
            new CustomEvent('custom-click', {
              composed: true,
              bubbles: true,
              detail: 'Some text',
            })
          );
        }}
      >
        Click me
      </button>

      <p>Message also updates in child. {props.message}</p>
    </>
  );
};

export default Nested;
