import React, { useEffect, useState } from "react";

const RadioButtonGroup = ({ options, onChange, defaultOption }) => {
  const [selectedValue, setSelectedValue] = useState();
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
  useEffect(() => {
    if (defaultOption && selectedValue !== defaultOption) {
      setSelectedValue(defaultOption);
    }
  }, [selectedValue]);

  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            name="radio-group"
            value={option.value}
            checked={defaultOption === option.value}
            onChange={handleRadioChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
