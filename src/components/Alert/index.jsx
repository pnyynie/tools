import React from 'react';

const Alert = ({ variant, message, onClose }) => {
  return (
    <div className={`alert alert-${variant} alert-dismissible fade show position-fixed start-50 z-3`} style={{ top: '10px' }} role="alert">
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
