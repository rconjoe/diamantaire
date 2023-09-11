import React from 'react';
import Switch from 'react-switch';

export const DarksideSwitch = ({ value, handleChange }) => {
  return (
    <Switch
      checked={value}
      onChange={handleChange}
      onColor="#719093"
      onHandleColor="var(--color-teal)"
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={10}
      width={38}
      className="react-switch"
      id="material-switch"
    />
  );
};
