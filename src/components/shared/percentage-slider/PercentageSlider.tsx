import React, { useState } from 'react';
import './PercentageSlider.css'

const PercentageSlider = () => {
  const [percentage, setPercentage] = useState(0);

  const handleSliderChange = (event) => {
    setPercentage(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <input
        type="range"
        min="0"
        max="100"
        value={percentage}
        onChange={handleSliderChange}
        className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <span className=" text-lg text-white">{percentage}%</span>
    </div>
  );
};

export default PercentageSlider;
