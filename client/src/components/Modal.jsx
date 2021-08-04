import React from 'react';
import ReactDom from 'react-dom';
import './modal.scss';

const Modal = ({ isOpen, title, children, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <div className='modalTitle'>{title}</div>
        <div>{children}</div>
        <div className='modalButtons'>
          <button className='cancelButton' onClick={onCancel}>
            Cancel
          </button>
          <button className='confirmButton' onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
