import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css';

const Code = ({ onChange, value }) => {
  return (
    <CodeMirror
      style={{
        widht: '100%',
        height: '100%',
      }}
      value={value}
      options={{
        mode: 'css',
        lineNumbers: true,
      }}
      onChange={onChange}/>
  );
}

export default Code;
