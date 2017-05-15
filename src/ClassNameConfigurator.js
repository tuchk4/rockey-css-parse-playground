import React from 'react';

const ClassNameConfigurator = ({ value, onChange }) => {
  return (
    <div>
      <span>getClassName = name => </span><input type="text" value={value} onChange={onChange}/>
    </div>
  );
}

export default ClassNameConfigurator;
