import React, { FC, useState } from 'react';

interface SegmentedControlButtonProps {
  state1: string;
  state2: string;
  onChange: (value: string) => void;
}

const SegmentedControlButton: FC<SegmentedControlButtonProps> = ({ state1, state2, onChange }) => {
  const [activeControl, setActiveControl] = useState(state1 || state2); // Initial active control state

  const handleSegmentedControlClick = (control) => {
    setActiveControl(control); // Update active control state based on clicked segment
    onChange(control); // Call the parent function to update the state
  };

  return (
    <div className="flex rounded-xl space-between" style={{ backgroundColor: '#232336' }}>
      <span
        className={`flex m-1 justify-center w-full py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out
        }`}
        style={{ backgroundColor: activeControl === state1 ? '#6161D6' : '' }}
        onClick={() => handleSegmentedControlClick(state1)}
      >
        Active
      </span>
      <span
        className={`flex m-1  justify-center w-full text-white text-sm py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out 
        }`}
        style={{ backgroundColor: activeControl === state2 ? '#6161D6' : '' }}
        onClick={() => handleSegmentedControlClick(state2)}
      >
        Inactive
      </span>
    </div>
  );
};

export default SegmentedControlButton;
