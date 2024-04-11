import React, { useState } from 'react';

function Alert() {
  const [message, setMessage] = useState('');

  const showAlert = (msg) => {
    setMessage(msg);
  };

  const hideAlert = () => {
    setMessage('');
  };

  return (
    <div>
      {message && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" aria-label="Close" onClick={hideAlert}></button>
        </div>
      )}
    </div>
  );
}

export default Alert;