import React from 'react';
import Box from 'react-layout-components'

const PropsEditor = ({ props, onChange }) => {
  const handleChange = (key, newKey, value) => {
    const newProps = [
      ...props
    ];

    let index = null;
    let found = false;
    newProps.forEach((prop, i) => {
      if (!found && prop.key === key) {
        index = i;
        // for some reason "return false" not wokrs
        found = true;
      }
    });

    newProps[index] = {
      key: newKey,
      value
    };

    onChange(newProps);
  };

  const handleAdd = () => {
    const newProps = [
      ...props
    ];

    newProps.push({
      key: '',
      value: ''
    });

    onChange(newProps);
  }

  const handleRemove = key => {
    const newProps = [];
    let found = false;

    props.forEach(prop => {
      if (!found && prop.key === key) {
        found = true;
      } else {
        newProps.push(prop);
      }
    });

    onChange(newProps);
  };

  return (
    <Box className="props-editor">
      <Box className="box props-editor__body">
        <h5>Props:</h5>
        {
          props.map((prop, index) => {
            return (
              <Box row className="props-editor__body-item" key={index}>
                <Box className="props-editor-controls">
                  <input type="text" className="props-editor-controls-item" value={prop.key} placeholder="property" onChange={e => {
                    handleChange(prop.key, e.target.value, prop.value);
                  }}/>
                  <span className="props-editor-controls-divider">:</span>
                  <input type="text" className="props-editor-controls-item" value={prop.value} placeholder="value" onChange={e => {
                    handleChange(prop.key, prop.key, e.target.value);
                  }}/>
                  <button className="button" onClick={e => handleRemove(prop.key)}>Remove</button>
                </Box>
              </Box>
            )
          })
        }
        <Box className="props-editor__actions">
          <button className="button btn-primary" onClick={handleAdd}>Add property</button>
        </Box>
      </Box>
    </Box>
  );
}

export default PropsEditor;
