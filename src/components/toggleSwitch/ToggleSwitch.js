import React from 'react';
import './ToggleSwitch.css';
import { useStateContext } from '../../ContextProvider';

const ToggleSwitch = ({ label }) => {
  const { checked, toggleChecked } = useStateContext();

  return (
    <div className="toggle-div">
      {label}{' '}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          defaultChecked={true}
          checked={checked}
          onChange={toggleChecked}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
