import React from 'react';
import classnames from 'classnames';

const ErrorBox = ({ isWarning, error }) => {
  const classList = classnames('error-box', {
    'warning-mode': isWarning,
  });

  return (
    <div>
      {error &&
        <pre className={classList}>
          {error.message}
        </pre>}
    </div>
  );
};

export default ErrorBox;
