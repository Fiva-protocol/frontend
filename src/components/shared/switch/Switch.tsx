import React, { useState } from 'react';

const Switch = () => {
  const [isOn, setIsOn] = useState(true);

  function toggleSwitch() {
    setIsOn(prevState => !prevState);
  }

  return (
    <div className="flex items-center gap-1">
    <button
      className={`relative w-9 h-5  transition duration-200 ease-in-out rounded-full`}
      style={{backgroundColor: '#232336'}}
      onClick={toggleSwitch}
    >
      <span
        className={`block w-4 h-4 transform transition-transform duration-200 ease-in-out rounded-full ${isOn ? 'translate-x-4' : 'translate-x-1'}`}
        style={{backgroundColor: isOn ? 'white' : '#41414D'}} 
      />
    </button>
    <span className="font-medium">Claim All Pool Rewards</span>
  </div>
  );
};

export default Switch;
