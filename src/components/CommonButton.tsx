import React from 'react';
import './CommonButton.css';

const CommonButton = ({ text, onClick }) => {
  return (
    <button className="common-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default CommonButton;
