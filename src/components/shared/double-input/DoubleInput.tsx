import React, { ChangeEvent, useEffect, useState } from 'react';

interface DoubleInputProps {
  label1: string;
  label2: string;
  iconPathInputLeft: string;
  label1InputLeft: string;
  label2InputLeft: string;
  isReadOnly: boolean, // Update the type to boolean
  inputType: string,
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DoubleInput: React.FC<DoubleInputProps> = ({
  label1,
  label2,
  iconPathInputLeft,
  label1InputLeft,
  label2InputLeft,
  isReadOnly = false,
  inputType,
  value,
  onChange,
}) => {

  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

return (
    <div>
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

            <input  type={inputType} className="half-input-right w-1/2" value={inputValue} onChange={handleInputChange} min="0" readOnly={isReadOnly}></input>
        </div>
    </div>
);
};

export default DoubleInput;
