import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ isOpen, title, children, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <div>
      <div>{title}</div>
      <div>{children}</div>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
