import React from 'react';

const ErrorBox = ({ error }) => {
  return (
    <div>
      {
        error && (
          <pre className="error-box">
            {error.message}
          </pre>
        )
      }
    </div>
  )
}

export default ErrorBox;
