import React from 'react';

const ClassNameConfigurator = ({ value, onChange, error }) => {
  const inputClassList = error ? 'classname-error' : null;

  return (
    <div className="class-name-configurator">
      <span>
        <span className="keyword">const</span>
        <span className="func-name">getClassName</span>
        <span className="symbol">=</span>
        <span className="arguments">name</span>
        <span className="arrow">⇒</span>
      </span>
      <span className="arrow">`</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={inputClassList}
      />
      <span className="arrow">`</span>
    </div>
  );
};

export default ClassNameConfigurator;
