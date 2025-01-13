import React from "react";

export const Dropdown = ({options, defaultVal, onChange, label}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {label && <label>{label}</label>}
          <select defaultValue={defaultVal} onChange={(e) => onChange(e.target.value)}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
}

export const FillMenu = ({ label, placeholder, value, onChange }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {label && <label>{label}</label>}
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };