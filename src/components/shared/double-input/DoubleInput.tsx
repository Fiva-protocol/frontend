import React, { ChangeEvent } from 'react';

interface DoubleInputProps {
  label1: string;
  label2: string;
  iconPathInputLeft: string;
  label1InputLeft: string;
  label2InputLeft: string;
  value: string;
  onChange: (value: string) => void;
}

const DoubleInput: React.FC<DoubleInputProps> = ({
  label1,
  label2,
  iconPathInputLeft,
  label1InputLeft,
  label2InputLeft,
  value,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <label className="flex pb-1">{label1}</label>
        <label className="flex pb-1">{label2}</label>
      </div>
      
      <div className="flex flex-row">
        <div className="half-input-left w-1/2">
          <div className="flex flex-row items-center gap-2">
            <img src={iconPathInputLeft} alt="" />
            <div className="flex flex-col">
                <div>{label1InputLeft}</div>
                <div className="text-4">{label2InputLeft}</div>
            </div>
          </div>
        </div>

        <input className="half-input-right w-1/2" value={value} onChange={handleInputChange}></input>
      </div>
    </>
  );
};

export default DoubleInput;
